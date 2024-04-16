import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalClientsModule } from './global-clients/global-clients.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { ConsulModule } from './consul/consul.module';
import Joi from 'joi';

@Module({
  imports: [
    AuthModule,
    GlobalClientsModule,
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
    HealthModule,
    ConsulModule,
  ],
})
export class AppModule {}
