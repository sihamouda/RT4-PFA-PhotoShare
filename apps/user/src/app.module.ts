import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { GenericService } from './generic/generic.service';
import { GenericModule } from './generic/generic.module';
import { Repository } from 'typeorm';
import * as Joi from 'joi';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [ConfigModule.forRoot(
    {
      envFilePath: '../../.dev.env',
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
    }
  ), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => (

      {
        type: 'postgres',
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    inject: [ConfigService],

  }), UserModule, GenericModule],
  controllers: [AppController],
  providers: [AppService, GenericService, Repository],
})
export class AppModule { }
