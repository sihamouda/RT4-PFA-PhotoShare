import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService){}

    async initiatePayment() {

        const headers = {"Authorization": `Token ${this.configService.get<string>("PAYMENT_API_KEY")}`, "Content-Type":"application/json"}
        const data = {}
        const apiPaymentGateway= "https://sandbox.paymee.tn/api/v2/payments/create"
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
            this.httpService.post(apiPaymentGateway, data, {headers: headers})
        )
        return res.data;
    }

    async verifyPayment(payload: any) {
        const { token, payment_status } = payload;

        const stringToHash = token + (payment_status ? '1' : '0') + this.configService.get<string>("PAYMENT_API_KEY");

        const calculatedChecksum = crypto.createHash('md5').update(stringToHash).digest('hex');

        return calculatedChecksum === payload.check_sum;


    }
}
