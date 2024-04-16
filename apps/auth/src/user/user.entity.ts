import { BaseEntity } from 'src/generic/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
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
