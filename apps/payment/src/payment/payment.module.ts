import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule, HttpService } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [HttpModule, ConfigModule, ClientsModule.register([
    {
      name: 'PAYMENT_QUEUE_SERVICE',

      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: 'payment_queue'
      }
    }
  ])],
  exports: [ClientsModule]
})
export class PaymentModule { }