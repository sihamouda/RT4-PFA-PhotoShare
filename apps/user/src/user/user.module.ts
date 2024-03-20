import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { UserRepository } from './user.reposiitory';

@Module({
  providers: [UserService,UserRepository],
  imports: [CassandraModule],
  exports: [UserService]
})
export class UserModule {}
