import { DynamicModule, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConsulModule } from '../consul/consul.module';

@Module({})
export class HealthModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: HealthModule,
      controllers: [HealthController],
      imports: [TerminusModule, HttpModule, ConsulModule.register(serviceName)],
    };
  }
}
