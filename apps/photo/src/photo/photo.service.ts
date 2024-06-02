import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo, User } from 'data';
import { Repository } from 'typeorm';
import { AbstractService } from 'data';
import { InjectMinio } from 'nestjs-minio';
import { TagService } from './tag.service';
import { PhotoCreateDto } from 'dto';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PhotoService extends AbstractService<Photo> {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectMinio() private readonly minioClient,
    private readonly tagService: TagService,
    private readonly configService: ConfigService,
    @Inject('USER_SERVICE') private userService: ClientProxy,
  ) {
    super(photoRepository);
  }

  bucket = this.configService.get<string>('MINIO_DEFAULT_BUCKETS');

  async createOne(dtoCreate: PhotoCreateDto, file: Express.Multer.File) {
    const fileName = Date.now() + file.originalname;
    const filePath = 'Photo/' + fileName;

    await this.minioClient.putObject(this.bucket, filePath, file.buffer);
    console.log(typeof dtoCreate.tags);

    const userObs = this.userService.send<User, string>(
      { cmd: 'findByUsername' },
      dtoCreate.username,
    );
    const user = await lastValueFrom(userObs);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const tags = await Promise.all(
      JSON.parse(dtoCreate.tags).map(
        async (element: string) =>
          await this.tagService.createIfNotExist(element),
      ),
    );

    return await this.photoRepository.save({
      ...dtoCreate,
      tags,
      uri: filePath,
      owner: user,
    });
  }
}
