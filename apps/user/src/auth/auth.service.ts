import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import {CommonNestjsService} from "common-nestjs"

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){
        console.log(CommonNestjsService.helloWorld());
        
        
    }

    async validate(username: string, password: string): Promise<User> {
        const user: User = await this.userService.findByUsername(username);
        if(!user){
            throw new BadRequestException("User not found");
        }

        const isMatch: boolean= bcrypt.compareSync(password, user.password);
        if(!isMatch){
            throw new BadRequestException("Password is not correct")
        }
        
        return user;
    }

    async login(user: User) {
        const payload = {
            username: user.username,
            aez: "zzaea",
            sub: user.id,
        };

        return  {acessToken: await this.jwtService.signAsync(payload)}
    }

    async register(userToCreate: CreateUserDto){

        const existingUser = await this.userService.findByUsername(userToCreate.username)
        console.log(existingUser);
        
        if (existingUser){
            throw new BadRequestException("User with email/username already exists")
        }

        const hashedPassword = bcrypt.hashSync(userToCreate.password,10);

        const newUser= await this.userService.save({
            username: userToCreate.username,
            password: hashedPassword,
            email: userToCreate.email,
        })

        return this.login(newUser)


    }

}
