import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

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
  password: string;
}
