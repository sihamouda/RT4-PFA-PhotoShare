import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreateDto, LoginDto } from 'dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user.username, user.password);
  }

  @Post('register')
  async register(@Body() newUser: UserCreateDto) {
    await this.authService.register(newUser);
    return 'OK';
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  async loginJwt(@Req() req) {
    return req.user;
  }
}
