import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'data';
import { Repository } from 'typeorm';
import { AbstractService } from 'data';

@Injectable()
export class OrderService extends AbstractService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
