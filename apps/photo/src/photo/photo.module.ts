import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Tag, User } from 'data';
import { TagService } from './tag.service';
import { NestMinioModule } from 'nestjs-minio/dist/nest-minio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [PhotoService, TagService],
  controllers: [PhotoController],
  imports: [
    TypeOrmModule.forFeature([User, Photo, Tag]),
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
