import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { ConsulService } from 'src/consul/consul.service';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private consulService: ConsulService,
      ) {
        
      }

      @Get()
      @HealthCheck()
      check() {
        return this.health.check([
          () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        ]);
      }

      @Get("consul")
      consulTest(){
        return this.consulService.getServiceInstances("authService")
      }
}
