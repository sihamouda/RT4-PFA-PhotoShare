import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoCreateDto, PhotoUpdateDto } from 'dto';
// import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.photoService.findOne(parseInt(id));
      return user;
    } catch (error) {
      throw new NotFoundException(`Photo with id ${id} not found`);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dtoCreate: PhotoCreateDto,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('No photo uploaded');
      }
      return await this.photoService.createOne(dtoCreate, file);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  // @MessagePattern({ cmd: 'findByUsername' })
  // async findByUsername(username: string) {
  //   try {
  //     const user = await this.photoService.findByUsername(username);
  //     return user;
  //   } catch (error) {
  //     throw new NotFoundException(`User with username ${username} not found`);
  //   }
  // }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() dtoUpdate: PhotoUpdateDto) {
    return this.photoService.update(parseInt(id), dtoUpdate);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    const deleted = await this.photoService.delete(parseInt(id));
    if (deleted.affected === 0) {
      throw new NotFoundException('Photo to delete not found');
    } else return 'Photo deleted';
  }
}
