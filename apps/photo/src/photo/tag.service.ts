import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'data';
import { Repository } from 'typeorm';
import { AbstractService } from 'data';

@Injectable()
export class TagService extends AbstractService<Tag> {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    super(tagRepository);
  }

  async createIfNotExist(tagName: string) {
    const tag = await this.tagRepository.findOneBy({ name: tagName });

    if (!tag) {
      return await this.create({ name: tagName });
    }

    return tag;
  }
}
