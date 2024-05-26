import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from 'common';
import { ConsulModule, ConsulService, ConsulServiceInfo } from 'common';
import { name } from '../../package.json';
import { setTimeout } from 'timers/promises';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('NODE_ENV') === 'local'
            ? 'dev_only'
            : configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ['local', 'dev'].includes(
            configService.get<string>('NODE_ENV'),
          )
            ? '60s'
            : '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
