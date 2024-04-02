import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GlobalClientsModule } from './global-clients/global-clients.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { ConsulService } from './consul/consul.service';
import { ConsulModule } from './consul/consul.module';
import * as Joi from 'joi';

@Module({
  imports: [AuthModule, GlobalClientsModule, ConfigModule.forRoot(
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
  ), HealthModule, ConsulModule],
  controllers: [AppController],
  providers: [AppService, ConsulService],
})
export class AppModule { }
