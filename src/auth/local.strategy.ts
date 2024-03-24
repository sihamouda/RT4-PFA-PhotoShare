import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){
        super()
    }

    async validate(username: string, password: string): Promise<User>{
        const user: User = await this.authService.validate(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
        
    }

}