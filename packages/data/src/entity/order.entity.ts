import { AbstractEntity } from '../abstract/entity.abstact';
import { Photo } from './photo.entity';
import { User } from './user.entity';
import { ManyToOne, Entity } from 'typeorm';

@Entity()
export class Order extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Photo, (photo) => photo.orders)
  photo: Photo;
}
