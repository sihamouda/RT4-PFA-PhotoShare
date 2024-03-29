import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Repository } from 'typeorm';

@Module({
})
export class GenericModule {}
