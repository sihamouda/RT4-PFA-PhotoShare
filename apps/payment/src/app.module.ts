import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './payment/payment.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PaymentModule, HttpModule,ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '../../.dev.env',

  })],
  controllers: [AppController, PaymentController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
