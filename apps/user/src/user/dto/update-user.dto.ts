import { PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './create-user.dto';
export class UserUpdateDto extends PartialType(UserCreateDto) {}
