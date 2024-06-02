import {
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PhotoCreateDto {
  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsBoolean()
  isFree: boolean;

  @IsOptional()
  @IsNumber()
  price: number;
}

import { PartialType } from '@nestjs/swagger';
export class PhotoUpdateDto extends PartialType(PhotoCreateDto) {}
