import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Consul from 'consul';
import { uuid } from 'uuidv4';

@Injectable()
export class ConsulService implements OnModuleInit {
    private consul;
    private serviceId
    constructor(private configSerice: ConfigService) {
        this.consul = new Consul({ host: 'consul' });
        this.serviceId = uuid();
    }

    async onModuleInit() {
        try {
            await this.consul.agent.service.register({
                id: this.serviceId,
                name: 'authhService',
                port: 3000,
                address: "auth",
                check: {
                    http: 'http://auth:3000/health',
                    interval: '30s',
                    deregistercriticalserviceafter: '1m',
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
            console.log('De-registering the service from Consul before shutting down...');
            await this.consul.agent.service.deregister(this.serviceId);
            console.log('Service de-registered from Consul successfully.');
        } catch (error) {
            console.error('Failed to de-register with Consul', error);
            process.exit(1);
        }
    }

    async getServiceInstances(serviceName: string): Promise<{ address: string; port: number }[]> {
        try {
            const services = await this.consul.agent.services();
            const serviceInstances = Object.values(services).filter(service => services.Service === serviceName);
            console.log(services);
            console.log(serviceInstances);
            
            
            return serviceInstances.map(service => ({
                address: services.Address,
                port: services.Port,
            }));
        } catch (error) {
            console.error(`Failed to get instances of service ${serviceName}`, error);
            return [];
        }
    }
}
