import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
// import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(@Inject("USER_SERVICE") private userService: ClientProxy, private readonly authService: AuthService){}

    @Post("login")
    @UseGuards(AuthGuard("local"))
    async login(@Body() user: CreateUserDto){
        return this.authService.login(user as User);
    }



    @Post("register")
    register(@Body() newUser: CreateUserDto){
        return this.authService.register(newUser);
    }

    @Post("loginJwt")
    @UseGuards(AuthGuard("jwt"))
    async loginJwt(@Req() req){
        return req.user
    }
}
