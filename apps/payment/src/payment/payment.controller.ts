import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {CreatePaymentDto} from "dto"

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @Post()
    async initatePayment(@Body() payload: CreatePaymentDto){
        
        return this.paymentService.initiatePayment(payload)
    }

    @Post("webhook")
   async handlePayment(@Body() payload: any){
        console.log("inside webhook",payload);
         
        const paymentIsValid = await this.paymentService.verifyPayment(payload);
        console.log(paymentIsValid);
        
        if (paymentIsValid){
                this.paymentService.sendPaymentToUser(payload)
        } else {
            // Show error
        }
        
    }
}