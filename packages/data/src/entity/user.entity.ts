import { AbstractEntity } from '../abstract/entity.abstact';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
}