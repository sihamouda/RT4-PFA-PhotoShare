import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ConsulService } from '../consul/consul.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private consulService: ConsulService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // The process should not use more than 150MB memory
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }

  // @Get('consul')
  // consulTest() {
  //   return this.consulService.getServiceInstances(name);
  // }
}
