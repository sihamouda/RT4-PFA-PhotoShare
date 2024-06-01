import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService,
        @Inject("PAYMENT_QUEUE_SERVICE") private readonly paymentQueueService: ClientProxy
    ) { }
    // API DOCS
    // https://www.paymee.tn/paymee-integration-without-redirection/
    async initiatePayment(payload: any) {

        const apiKey = this.configService.get<string>("PAYMENT_API_KEY");
        console.log(apiKey);

        const headers = { "Authorization": `Token ${apiKey}`, "Content-Type": "application/json" }
        const data = {}
        const apiPaymentGateway = "https://sandbox.paymee.tn/api/v2/payments/create"
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
        const res = await firstValueFrom(
            this.httpService.post(apiPaymentGateway, payload, { headers: headers })
        )
        return res.data;
    }

    async verifyPayment(payload: any) {
        const { token, payment_status } = payload;

        const stringToHash = token + (payment_status ? '1' : '0') + this.configService.get<string>("PAYMENT_API_KEY");


        const calculatedChecksum = crypto.createHash('md5').update(stringToHash).digest('hex');

        return calculatedChecksum === payload.check_sum;


    }

    async sendPaymentToUser(photo){
        this.paymentQueueService.emit('order-placed',photo);
        return {messaage: 'order placed :)'}
    }
}