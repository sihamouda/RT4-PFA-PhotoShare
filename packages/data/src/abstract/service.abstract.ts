import { AbstractEntity } from './entity.abstact';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';

export abstract class AbstractService<T extends AbstractEntity> {
  constructor(private asbtractRepository: Repository<T>) {}

  async create(dtoCreate: DeepPartial<T>) {
    return await this.asbtractRepository.save(dtoCreate);
  }

  async findAll() {
    return await this.asbtractRepository.find();
  }

  async findOne(id: number) {
    return await this.asbtractRepository.findOneBy({
      id,
    } as FindOptionsWhere<T>);
  }

  async update(id: number, dtoUpdate) {
    return await this.asbtractRepository.update(id, dtoUpdate);
  }

  async delete(id: number) {
    return await this.asbtractRepository.delete(id);
  }
}
