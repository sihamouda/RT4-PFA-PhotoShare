import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.reposiitory';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository){} // Declaring userRepository as a class property

    async createNewUser() {
        await this.userRepository.createNewUser(); // Accessing the createNewUser method of userRepository
    }
}
