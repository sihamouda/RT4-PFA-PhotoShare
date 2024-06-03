import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  password: string;
}

import { PartialType } from '@nestjs/swagger';
export class UserUpdateDto extends PartialType(UserCreateDto) {}

export class LoginDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  password: string;
}
