import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './payment/payment.controller';

@Module({
  imports: [PaymentModule, HttpModule],
  controllers: [AppController, PaymentController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
