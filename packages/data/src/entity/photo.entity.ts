import { AbstractEntity } from '../abstract/entity.abstact';
import { Column, Entity, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Order } from './order.entity';

// type Dimension = {
//   x: number;
//   y: number;
// };

@Entity()
export class Photo extends AbstractEntity {
  @Column({
    unique: true,
  })
  uri: string;

  @ManyToMany(() => Tag, (tag) => tag.photos)
  tags: Tag[];

  @Column({ default: true })
  isFree: boolean;

  @Column({ default: 0 })
  price: number;

  //   @Column()
  //   dimensions: Dimension[];

  @ManyToOne(() => User, (user) => user.photos)
  owner: User;

  @OneToMany(() => Order, (order) => order.photo)
  orders: Order[];
}
