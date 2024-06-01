import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ConsulModule } from 'common';
import { name } from '../package.json';

@Module({
  imports: [PaymentModule, HttpModule , ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '../../.env.dev',

  }),ConsulModule.register(name)],
  controllers: [AppController, PaymentController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
