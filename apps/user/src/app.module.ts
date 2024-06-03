import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
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
      envFilePath: '../../.env.dev',
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
        autoLoadEntities:
          configService.get<string>('NODE_ENV') === 'local' ? true : false,
        synchronize:
          configService.get<string>('NODE_ENV') === 'local' ? true : false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConsulModule.register(name),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('NODE_ENV') === 'local'
            ? 'dev_only'
            : configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ['local', 'dev'].includes(
            configService.get<string>('NODE_ENV'),
          )
            ? '60s'
            : '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Repository, JwtStrategy],
})
export class AppModule {}
