import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class PaymentCreateDto {
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

  @IsString()
  @IsNotEmpty()
  photoId: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
