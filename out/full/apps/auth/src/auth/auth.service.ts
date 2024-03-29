import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
// import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import {CommonNestjsService} from "common-nestjs"

@Injectable()
export class AuthService {

    constructor(@Inject("USER_SERVICE") private userService: ClientProxy,private jwtService: JwtService){
        // console.log(CommonNestjsService.helloWorld());
        
        
    }

    async validate(username: string, password: string){
        console.log("inside",username);
        
        const userObs = this.userService.send({cmd: "findByUsername"},username);
        const user =  await lastValueFrom(userObs)
        console.log(user);
        
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
            sub: user.id,
        };

        return  {acessToken: await this.jwtService.signAsync(payload)}
    }

    async register(userToCreate: CreateUserDto){
        
        const userObs = this.userService.send({cmd: "findByUsername"},userToCreate.username);
        const existingUser = await lastValueFrom(userObs);
        console.log(existingUser);
        
        if (existingUser){
            throw new BadRequestException("User with email/username already exists")
        }


        const hashedPassword = bcrypt.hashSync(userToCreate.password,10);
        const newUser = this.userService.send({cmd: "createUser"},{
            username: userToCreate.username,
            password: hashedPassword,
            email: userToCreate.email,
        })
        const resultUser = await lastValueFrom(newUser)
        // const newUser= await this.userService.save({
        //     username: userToCreate.username,
        //     password: hashedPassword,
        //     email: userToCreate.email,
        // })

        return this.login(resultUser)


    }

}


