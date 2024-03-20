import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CassandraModule } from './cassandra/cassandra.module';

@Module({
  imports: [
    UserModule,
    // TODO: impove config logic
    ConfigModule.forRoot({
      envFilePath: '../../.dev.env',
    }),

    CassandraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
