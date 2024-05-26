import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('USER_PORT'), () => {
    console.log('listening on port', configService.get<number>('USER_PORT'));
  });
  console.log(configService.get<number>('USER_PORT'));
}
bootstrap();
