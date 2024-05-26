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
