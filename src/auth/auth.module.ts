import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule,PassportModule,JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>("DB_PASSWORD"),
      signOptions: {
        expiresIn: '600s'
      }
    }),
    inject: [ConfigService]
  })],
})
export class AuthModule {}
