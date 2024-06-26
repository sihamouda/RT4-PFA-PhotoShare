import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'data';
import { Repository } from 'typeorm';
import { AbstractService } from 'data';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findAll(isPopulated: boolean = false) {
    return await this.userRepository.find({
      relations: { photos: isPopulated },
    });
  }

  async findOne(id: number, isPopulated: boolean = false) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { photos: isPopulated },
    });
  }
}
