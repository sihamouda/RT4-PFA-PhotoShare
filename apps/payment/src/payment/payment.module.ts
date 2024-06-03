import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';
import * as Joi from 'joi';
import { ConsulModule, ConsulService, ConsulServiceInfo } from 'common';
import { name } from '../../package.json';
import { setTimeout } from 'timers/promises';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Tag, User, Order } from 'data';
import { OrderService } from './order.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    HttpModule,
    OrderService,
    TypeOrmModule.forFeature([User, Photo, Tag, Order]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PAYMENT_QUEUE_NAME: Joi.string().required(),
      }),
    }),
    ConsulModule.register(name),
    ClientsModule.registerAsync([
      {
        name: 'PHOTO_SERVICE',
        imports: [ConsulModule.register(name)],
        inject: [ConfigService, ConsulService],
        useFactory: async (
          configService: ConfigService,
          ConsulService: ConsulService,
        ) => {
          // waits until service register to consul
          await setTimeout(60 * 1000);

          const availableUserInstances: ConsulServiceInfo[] =
            await ConsulService.getServiceInstances('photo');
          console.log('>', availableUserInstances);

          return {
            transport: Transport.TCP,
            options: {
              // select random instance from array of instances
              host: availableUserInstances[
                Math.floor(Math.random() * availableUserInstances.length)
              ].Address,
              port: configService.get<number>('PHOTO_TCP_PORT'),
            },
          };
        },
      },
      {
        name: 'USER_SERVICE',
        imports: [ConsulModule.register(name)],
        inject: [ConfigService, ConsulService],
        useFactory: async (
          configService: ConfigService,
          ConsulService: ConsulService,
        ) => {
          // waits until service register to consul
          await setTimeout(60 * 1000);

          const availableUserInstances: ConsulServiceInfo[] =
            await ConsulService.getServiceInstances('user');
          console.log('>', availableUserInstances);

          return {
            transport: Transport.TCP,
            options: {
              // select random instance from array of instances
              host: availableUserInstances[
                Math.floor(Math.random() * availableUserInstances.length)
              ].Address,
              port: configService.get<number>('USER_TCP_PORT'),
            },
          };
        },
      },
      {
        name: 'PAYMENT_QUEUE_SERVICE',
        imports: [ConsulModule.register(name), ConfigModule],
        inject: [ConfigService, ConsulService],
        useFactory: async (
          configService: ConfigService,
          consulService: ConsulService,
        ) => {
          await setTimeout(60 * 1000);

          const availableUserInstances: ConsulServiceInfo[] =
            await consulService.getServiceInstances('rabbitmq');
          const urls = availableUserInstances.map(
            (instance) => `amqp://${instance.Address}:${instance.Port}`,
          );
          return {
            transport: Transport.RMQ,
            options: {
              urls,
              queue: configService.get<string>('PAYMENT_QUEUE_NAME'),
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class PaymentModule implements OnModuleInit {
  private readonly logger = new Logger(PaymentModule.name);
  private paymentQueueService: ClientProxy;

  constructor(
    private readonly configService: ConfigService,
    private readonly consulService: ConsulService,
  ) {}

  async onModuleInit() {
    try {
      const availableUserInstances: ConsulServiceInfo[] =
        await this.consulService.getServiceInstances('rabbitmq');
      const urls = availableUserInstances.map(
        (instance) => `amqp://${instance.Address}:${instance.Port}`,
      );

      this.paymentQueueService = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls,
          queue: this.configService.get<string>('PAYMENT_QUEUE_NAME'),
          queueOptions: {
            durable: true,
          },
        },
      });

      await this.paymentQueueService.connect();
      this.logger.log('Successfully connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      process.exit(1);
    }
  }
}
