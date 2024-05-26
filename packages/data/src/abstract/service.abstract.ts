import { AbstractEntity } from './entity.abstact';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';

export abstract class AbstractService<T extends AbstractEntity> {
  constructor(private asbtractRepository: Repository<T>) {}

  create(dtoCreate: DeepPartial<T>) {
    return this.asbtractRepository.save(dtoCreate);
  }

  findAll() {
    return this.asbtractRepository.find();
  }

  findOne(id: number) {
    return this.asbtractRepository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async update(id: number, dtoUpdate) {
    return await this.asbtractRepository.update(id, dtoUpdate);
  }

  async delete(id: number) {
    return await this.asbtractRepository.delete(id);
  }
}
