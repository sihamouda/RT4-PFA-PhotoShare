import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
// import { ConsulModule } from '../consul/consul.module';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, HttpModule],
})
export class HealthModule {
  // static register(): DynamicModule {
  //   return {
  //     module: HealthModule,
  //     controllers: [HealthController],
  //     imports: [TerminusModule, HttpModule],
  //   };
  // }
}
