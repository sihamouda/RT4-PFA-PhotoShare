import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreateDto } from 'dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: UserCreateDto) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() newUser: UserCreateDto) {
    return this.authService.register(newUser);
  }

  @Post('loginJwt')
  @UseGuards(AuthGuard('jwt'))
  async loginJwt(@Req() req) {
    return req.user;
  }
}
