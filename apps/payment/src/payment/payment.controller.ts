import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @Post()
    async initatePayment(@Body() payload){
        
        return this.paymentService.initiatePayment(payload)
    }

    @Post("webhook")
    handlePayment(@Body() payload: any){
        console.log("inside webhook",payload);
         
        const paymentIsValid= this.paymentService.verifyPayment(payload);
        console.log(paymentIsValid);
        
        if (paymentIsValid){
            //  Implement DB update logic
        } else {
            // Show error
        }
        
    }
}
