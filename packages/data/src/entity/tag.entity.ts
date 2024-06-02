import { AbstractEntity } from '../abstract/entity.abstact';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Tag extends AbstractEntity {
  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Photo, (photo) => photo.tags)
  @JoinTable()
  photos: Photo[];
}
