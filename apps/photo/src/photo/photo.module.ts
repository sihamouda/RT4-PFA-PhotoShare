import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Tag, User } from 'data';
import { TagService } from './tag.service';
import { NestMinioModule } from 'nestjs-minio/dist/nest-minio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsulModule, ConsulService, ConsulServiceInfo } from 'common';
import { name } from '../../package.json';
import { setTimeout } from 'timers/promises';

@Module({
  providers: [PhotoService, TagService],
  controllers: [PhotoController],
  imports: [
    TypeOrmModule.forFeature([User, Photo, Tag]),
    ClientsModule.registerAsync([
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
    ]),
    NestMinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        endPoint:
          configService.get<string>('NODE_ENV') === 'local'
            ? 'localhost'
            : configService.get<string>('MINIO_DOMAIN'),
        port: parseInt(configService.get<string>('MINIO_PORT')),
        useSSL: configService.get<string>('NODE_ENV') === 'production',
        region: configService.get<string>('MINIO_REGION'),
        accessKey: configService.get<string>('MINIO_ROOT_USER'),
        secretKey: configService.get<string>('MINIO_ROOT_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [PhotoService],
})
export class PhotoModule {}
