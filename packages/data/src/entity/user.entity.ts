import { AbstractEntity } from '../abstract/entity.abstact';
import { Column, Entity, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

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

  @OneToMany(() => Photo, (photo) => photo.owner)
  photos: Photo[];
}
