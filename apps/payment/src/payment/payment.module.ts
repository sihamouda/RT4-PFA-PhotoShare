import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import * as Joi from 'joi';
import { ConsulModule, ConsulService, ConsulServiceInfo } from 'common';
import { name } from '../../package.json';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PAYMENT_QUEUE_NAME: Joi.string().required(),
      })
    }),
    ConsulModule.register(name),
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_QUEUE_SERVICE',
        imports: [ConsulModule.register(name)],
        inject: [ConfigService, ConsulService],
        useFactory: async (
          configService: ConfigService,
          ConsulService: ConsulService,
        ) => {
          // waits until service register to consul
          // await setTimeout(60 * 1000);

          const availableUserInstances: ConsulServiceInfo[] =
            await ConsulService.getServiceInstances('rabbitmq');
          console.log('>', availableUserInstances);
          const urls = availableUserInstances.map(
            instance => `amqp://${instance.Address}:${instance.Port}`
          );
          return {
            transport: Transport.RMQ,
            options: {
              // select random instance from array of instances
              // host: availableUserInstances[
              //   Math.floor(Math.random() * availableUserInstances.length)
              // ].Address,
              // port: configService.get<number>('USER_TCP_PORT'),
              urls,
              queue: configService.get<string>("PAYMENT_QUEUE_SERVICE"),
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
    // ClientsModule.register([
    //   {
    //     name: 'PAYMENT_QUEUE_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'payment_queue',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  exports: [ClientsModule],
})
export class PaymentModule implements OnModuleInit {
  private readonly logger = new Logger(PaymentModule.name);
  private paymentQueueService: ClientProxy;

  constructor() {
    this.paymentQueueService = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'payment_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.paymentQueueService.connect();
      this.logger.log('Successfully connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      process.exit(1);
    }
  }
}
