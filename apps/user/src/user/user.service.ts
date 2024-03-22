import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class UserService extends GenericService<CreateUserDto, CreateUserDto , CreateUserDto>{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
        super(userRepository)
    }

    // async createUser(newUser: CreateUserDto): Promise<User> {
    //     console.log("here");
    //     const user: User = new User();
    //     user.email= newUser.email;
    //     user.username= newUser.username;
    //     user.password= newUser.password;
    //     return this.userRepository.save(user)
    // }
}
