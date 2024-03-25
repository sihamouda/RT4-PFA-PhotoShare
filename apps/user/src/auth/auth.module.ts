import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  providers: [AuthService,LocalStrategy,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },JwtStrategy],
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
