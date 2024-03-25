import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post("register")
    register(@Body() newUser: CreateUserDto){
        return this.authService.register(newUser);
    }

    @Post("login")
    @UseGuards(AuthGuard("local"))
    async login(@Body() user: CreateUserDto){
        return this.authService.login(user as User);
    }

    @Post("loginJwt")
    @UseGuards(AuthGuard("jwt"))
    async loginJwt(@Req() req){
        return req.user
    }
}
