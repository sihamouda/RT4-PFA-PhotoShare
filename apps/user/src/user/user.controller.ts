import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from 'dto';
import { UserCreateDto } from 'dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(parseInt(id));
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  @Post()
  async create(@Body() dtoCreate: UserCreateDto) {
    return this.userService.create(dtoCreate);
  }

  //   @MessagePattern({ cmd: 'findByUsername' })
  //   async findUserByUsername(username: string) {
  //     try {
  //       const user = await this.userService.findByUsername(username);
  //       return user;
  //     } catch (error) {
  //       throw new NotFoundException(`User with username ${username} not found`);
  //     }
  //   }

  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() dtoUpdate: UserUpdateDto) {
    return this.userService.update(parseInt(id), dtoUpdate);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    const deleted = await this.userService.delete(parseInt(id));
    if (deleted.affected === 0) {
      throw new NotFoundException('User to delete not found');
    } else return 'User deleted';
  }
}
