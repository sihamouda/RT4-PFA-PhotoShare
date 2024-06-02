import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     host:
  //       configService.get<string>('NODE_ENV') === 'local'
  //         ? 'localhost'
  //         : configService.get<string>('PORT_HOST'),
  //     port: configService.get<number>('PORT_TCP_PORT'),
  //   },
  // });
  // app.startAllMicroservices();

  await app.listen(configService.get<number>('PHOTO_PORT'), () => {
    console.log('listening on port', configService.get<number>('PHOTO_PORT'));
  });
  console.log(configService.get<number>('PHOTO_PORT'));
}
bootstrap();
