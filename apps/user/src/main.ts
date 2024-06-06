import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host:
        configService.get<string>('NODE_ENV') === 'local'
          ? 'localhost'
          : configService.get<string>('USER_HOST'),
      port: configService.get<number>('USER_TCP_PORT'),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls:
        configService.get<string>('NODE_ENV') === 'local'
          ? ['amqp://localhost:5672']
          : [`amqp://${configService.get<string>('RMQ_HOST')}:5672`],
      queue: 'payment_queue',
    },
  });
  app.startAllMicroservices();

  await app.listen(configService.get<number>('USER_PORT'), () => {
    console.log('listening on port', configService.get<number>('USER_PORT'));
  });
  console.log(configService.get<number>('USER_PORT'));
}
bootstrap();
