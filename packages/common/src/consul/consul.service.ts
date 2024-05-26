import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Consul from 'consul';
import { UUID, randomUUID } from 'crypto';

type ServiceFQDN = {
  host: string;
  port: number;
};

@Injectable()
export class ConsulService implements OnModuleInit {
  private consul: Consul;
  private serviceId: UUID;
  private serviceFQDN: ServiceFQDN;

  constructor(
    private configService: ConfigService,
    @Inject('SERVICE_NAME') private serviceName: string,
  ) {
    this.consul = new Consul({
      host:
        this.configService.get<string>('NODE_ENV') === 'local'
          ? 'localhost'
          : this.configService.get<string>('CONSOL_HOST'),
    });
    this.serviceId = randomUUID();
    this.serviceFQDN = {
      host:
        this.configService.get<string>('NODE_ENV') === 'local'
          ? 'host.docker.internal'
          : this.configService.get<string>(
              `${this.serviceName.toUpperCase()}_HOST`,
            ),
      // Casting to number fails for some reason
      port: parseInt(
        this.configService.get<string>(
          `${this.serviceName.toUpperCase()}_PORT`,
        ),
      ),
    };
  }

  async onModuleInit() {
    try {
      await this.consul.agent.service.register({
        id: this.serviceId,
        name: this.serviceName,
        port: this.serviceFQDN.port,
        address: this.serviceFQDN.host,
        check: {
          http: `http://${this.serviceFQDN.host}:${this.serviceFQDN.port}/health`,
          interval:
            this.configService.get<string>('NODE_ENV') === 'local'
              ? '10s'
              : '30s',
          deregistercriticalserviceafter:
            this.configService.get<string>('NODE_ENV') === 'local'
              ? '20s'
              : '1m',
        },
      });
      console.log('Service registered with Consul successfully.');
    } catch (error) {
      console.error('Failed to register with Consul', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    try {
      console.log(
        'De-registering the service from Consul before shutting down...',
      );
      await this.consul.agent.service.deregister(this.serviceId);
      console.log('Service de-registered from Consul successfully.');
    } catch (error) {
      console.error('Failed to de-register with Consul', error);
      process.exit(1);
    }
  }

  async getServiceInstances(serviceName: string): Promise<ServiceFQDN[]> {
    try {
      const services = await this.consul.agent.services();
      console.log(services);
      const serviceInstances = Object.values(services).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_service) => services.Service === serviceName,
      );
      console.log(services);
      console.log(serviceInstances);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return serviceInstances.map((_service) => ({
        host: services.Address,
        port: services.Port,
      }));
    } catch (error) {
      console.error(`Failed to get instances of service ${serviceName}`, error);
      return [];
    }
  }
}
