import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CassandraService } from './cassandra/cassandra.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): any {
    this.userService.createNewUser();
  }
}
