import { Module } from '@nestjs/common';
import { ConsulService } from './consul.service';

@Module({
  exports: [ConsulService],
  providers: [ConsulService],
})
export class ConsulModule {}
