import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import * as Consul from 'consul';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('AUTH_PORT'), () => {
    console.log('listening on port', configService.get<number>('AUTH_PORT'));
  });
  console.log(configService.get<number>('AUTH_PORT'));
  // const consul = new Consul();
}
bootstrap();
