import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from 'dto';
import { UserCreateDto } from 'dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query('populate') populate: string) {
    return this.userService.findAll(
      populate && populate.toLocaleLowerCase() === 'true',
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Query('populate') populate: string) {
    try {
      const user = await this.userService.findOne(
        parseInt(id),
        populate && populate.toLocaleLowerCase() === 'true',
      );
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dtoCreate: UserCreateDto) {
    return this.userService.create(dtoCreate);
  }

  @MessagePattern({ cmd: 'create' })
  async createOverTCP(@Body() dtoCreate: UserCreateDto) {
    return this.userService.create(dtoCreate);
  }

  @MessagePattern({ cmd: 'findByUsername' })
  async findByUsername(username: string) {
    try {
      const user = await this.userService.findByUsername(username);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() dtoUpdate: UserUpdateDto) {
    return this.userService.update(parseInt(id), dtoUpdate);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    const deleted = await this.userService.delete(parseInt(id));
    if (deleted.affected === 0) {
      throw new NotFoundException('User to delete not found');
    } else return 'User deleted';
  }

  @EventPattern("order-placed")
  async updateUserPhotos(@Payload() data){
    console.log("queue worked", data);
    
    return data;
  }
}
