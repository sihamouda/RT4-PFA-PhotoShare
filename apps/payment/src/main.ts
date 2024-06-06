import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./src/cert/key.pem'),
  //   cert: fs.readFileSync('./src/cert/cert.pem'),
  // }
  const app = await NestFactory.create(
    AppModule,
    // { httpsOptions },
  );

  await app.listen(3005);
}
bootstrap();
