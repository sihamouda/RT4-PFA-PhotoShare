import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentCreateDto } from 'dto';
import { ConsulService } from 'common';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private consulService: ConsulService,
  ) {}

  @Post()
  async initatePayment(@Body() payload: PaymentCreateDto) {
    return this.paymentService.initiatePayment(payload);
    // return this.paymentService.sendPaymentToUser(payload)
    // return this.consulService.getServiceInstances('rabbitmq')
  }

  @Post('webhook')
  async handlePayment(@Body() payload: any) {
    console.log('inside webhook', payload);

    const paymentIsValid = await this.paymentService.verifyPayment(payload);
    console.log(paymentIsValid);

    if (paymentIsValid) {
      this.paymentService.sendPaymentToUser(payload);
    } else {
      // Show error
    }
  }
}
