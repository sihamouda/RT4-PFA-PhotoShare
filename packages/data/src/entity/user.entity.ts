import { AbstractEntity } from '../abstract/entity.abstact';
import { Column, Entity, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';
import { Order } from './order.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumebr: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Photo, (photo) => photo.owner)
  photos: Photo[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
