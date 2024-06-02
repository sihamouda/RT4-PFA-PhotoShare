import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query('populate') populate: string) {
    return this.tagService.findAll(
      populate && populate.toLocaleLowerCase() === 'true',
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Query('populate') populate: string) {
    try {
      const user = await this.tagService.findOne(
        parseInt(id),
        populate && populate.toLocaleLowerCase() === 'true',
      );
      return user;
    } catch (error) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
  }

  async findByName(
    @Query('name') name: string,
    @Query('populate') populate: string,
  ) {
    try {
      const user = await this.tagService.findOneByName(
        name,
        populate && populate.toLocaleLowerCase() === 'true',
      );
      return user;
    } catch (error) {
      throw new NotFoundException(`Tag with id ${name} not found`);
    }
  }
}
