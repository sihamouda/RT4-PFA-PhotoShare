import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.tagService.findOne(parseInt(id));
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
