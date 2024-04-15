import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @Post()
    async initatePayment(){
        return this.paymentService.initiatePayment()
    }

    @Post("webhook")
    handlePayment(@Body() payload: any){
        console.log(payload);
         
        const paymentIsValid= this.paymentService.verifyPayment(payload);

        if (paymentIsValid){
            //  Implement DB update logic
        } else {
            // Show error
        }
        
    }
}
