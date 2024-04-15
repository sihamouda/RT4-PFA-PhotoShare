import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator"

export class CreatePayment {

    @IsNotEmpty()
    @IsNumber()
    amount: string;

    @IsNotEmpty()
    note: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsUrl()
    return_url: string;

    @IsNotEmpty()
    @IsUrl()
    cancel_url: string;

    @IsOptional()
    order_id: string;
}