import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConsulModule } from 'src/consul/consul.module';

@Module({
  controllers: [HealthController],
  imports:[TerminusModule,HttpModule,ConsulModule]
})
export class HealthModule {}
