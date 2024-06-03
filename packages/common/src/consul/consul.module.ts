import { DynamicModule, Module } from '@nestjs/common';
import { ConsulService } from './consul.service';
import { HealthModule } from '../health/health.module';

@Module({})
export class ConsulModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: ConsulModule,
      providers: [
        ConsulService,
        {
          provide: 'SERVICE_NAME',
          useValue: serviceName,
        },
      ],
      exports: [ConsulService],
      imports: [HealthModule],
    };
  }
}
