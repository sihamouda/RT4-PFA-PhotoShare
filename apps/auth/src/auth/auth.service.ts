import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'data';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserCreateDto } from 'dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const userObs = this.userService.send<User, string>(
      { cmd: 'findByUsername' },
      username,
    );
    const user = await lastValueFrom(userObs);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password is not correct');
    }

    return user;
  }

  async login(username: string, password: string) {
    const result = await this.validate(username, password);
    const payload = {
      username: result.username,
      sub: result.id,
    };

    return { acessToken: await this.jwtService.signAsync(payload) };
  }

  async register(userToCreate: UserCreateDto) {
    const userObs = this.userService.send<User, string>(
      { cmd: 'findByUsername' },
      userToCreate.username,
    );
    console.log(userObs);
    const existingUser = await lastValueFrom(userObs);

    if (existingUser) {
      throw new BadRequestException('User with email/username already exists');
    }

    const hashedPassword = bcrypt.hashSync(userToCreate.password, 10);

    const newUser = this.userService.send<User, UserCreateDto>(
      { cmd: 'create' },
      {
        username: userToCreate.username,
        password: hashedPassword,
        email: userToCreate.email,
        firstName: userToCreate.firstName,
        lastName: userToCreate.lastName,
        phoneNumber: userToCreate.phoneNumber,
      },
    );
    return await lastValueFrom(newUser);
  }
}
