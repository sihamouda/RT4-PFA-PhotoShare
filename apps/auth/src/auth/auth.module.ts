import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './strategy/local.strategy';
// import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [PassportModule, ClientsModule.registerAsync([{
    name: 'USER_SERVICE',
    useFactory: async (configService: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('USER_SERVICE_HOST'),
        port: configService.get<number>('USER_SERVICE_PORT'),
      }
    }),
    inject: [ConfigService],
  },]), JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>("DB_PASSWORD"),
      signOptions: {
        expiresIn: "600s"
      }
    }),
    inject: [ConfigService]
  })],
})
export class AuthModule { }
