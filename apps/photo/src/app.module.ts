import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import { Repository } from 'typeorm';
import * as Joi from 'joi';
import { name } from '../package.json';
import { ConsulModule, JwtStrategy } from 'common';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: ['local', 'development'].includes(
          configService.get<string>('NODE_ENV'),
        )
          ? true
          : false,
        synchronize: ['local', 'development'].includes(
          configService.get<string>('NODE_ENV'),
        )
          ? true
          : false,
      }),
      inject: [ConfigService],
    }),
    PhotoModule,
    ConsulModule.register(name),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('NODE_ENV') === 'local'
            ? 'dev_only'
            : configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ['local', 'development'].includes(
            configService.get<string>('NODE_ENV'),
          )
            ? '3m'
            : '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Repository, JwtStrategy],
})
export class AppModule {}
