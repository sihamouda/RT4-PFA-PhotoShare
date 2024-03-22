import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { DeepPartial, FindOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class GenericService<T, C, U> {
    constructor(private readonly genericRepository: Repository<T>) { }


    async save(entity: any): Promise<T[]> {
        try {
            return this.genericRepository.save(entity)

        } catch (error) {
            console.log(error,"jezaeza");
            
        }
    }


    async findAll(): Promise<T[]> {
        try {
            return this.genericRepository.find()

        } catch (error) {
            throw new BadGatewayException(error)
        }
    }

    async findById(id): Promise<T> {
        const query = {
            id,
        } as FindOptionsWhere<T>
        const user =  await this.genericRepository.findOne(query);
        return user;

    }

    async update(id, data: any)  {
        
        return await this.genericRepository.update({
            id        },{...data})
        // return await this.genericRepository.update({id}, data)
      }

      async delete(id) {
        return await this.genericRepository.delete({id})
      }


}