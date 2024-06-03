import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateDto } from 'dto';
import { OrderService } from './order.service';
import { User } from 'data';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('PAYMENT_QUEUE_SERVICE')
    private readonly paymentQueueService: ClientProxy,
    private readonly orderService: OrderService,
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('PHOTO_SERVICE') private photoService: ClientProxy,
  ) {}
  // API DOCS
  // https://www.paymee.tn/paymee-integration-without-redirection/
  async initiatePayment(payload: PaymentCreateDto) {
    const apiKey = this.configService.get<string>('PAYMENT_API_KEY');
    console.log(apiKey);

    const headers = {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const apiPaymentGateway =
      'https://sandbox.paymee.tn/api/v2/payments/create';
    // const data = {
    //     "amount": 220.25,
    //     "note": "Order #123",
    //     "first_name": "John",
    //     "last_name": "Doe",
    //     "email": "test@paymee.tn",
    //     "phone": "+21611222333",
    //     "return_url": "https://www.return_url.tn",
    //     "cancel_url": "https://www.cancel_url.tn",
    //     "webhook_url": "https://localhost:3002/payment/webhook",
    //     "order_id": "244557",
    //     "vendor": 1265
    // }

    // get user entity
    const userObs = this.userService.send<User, string>(
      { cmd: 'findByUsername' },
      payload.username,
    );
    const user = await lastValueFrom(userObs);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // get photo entity
    const photoObs = this.photoService.send<User, string>(
      { cmd: 'findById' },
      payload.photoId,
    );
    const photo = await lastValueFrom(photoObs);

    if (!photo) {
      throw new BadRequestException('User not found');
    }

    // create order
    const order = await this.orderService.create({ photo, user });

    const res = await firstValueFrom(
      this.httpService.post(
        apiPaymentGateway,
        {
          amount: payload.amount,
          note: payload.note,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          return_url: payload.return_url,
          cancel_url: payload.cancel_url,
          order: order.id,
        },
        { headers: headers },
      ),
    );
    return res.data;
  }

  async verifyPayment(payload: any) {
    const { token, payment_status } = payload;

    const stringToHash =
      token +
      (payment_status ? '1' : '0') +
      this.configService.get<string>('PAYMENT_API_KEY');

    const calculatedChecksum = crypto
      .createHash('md5')
      .update(stringToHash)
      .digest('hex');

    return calculatedChecksum === payload.check_sum;
  }

  async sendPaymentToUser(photo) {
    this.paymentQueueService.emit('order-placed', photo);

    return { messaage: 'order placed :)' };
  }
}
