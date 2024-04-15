import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import {HttpModule, HttpService} from "@nestjs/axios"
import {ConfigModule} from "@nestjs/config"
@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [HttpModule, ConfigModule]
})
export class PaymentModule {}
