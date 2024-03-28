import { BadGatewayException, Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryExceptionFilter } from 'src/generic/qurty-failed';
import { QueryFailedError } from 'typeorm';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    // @Post()
    // @UseFilters(QueryExceptionFilter)
    // createUser(@Body() createUser: CreateUserDto) {
    //     return this.userService.save(createUser)

    // }
    
    @MessagePattern({cmd: "createUser"})
    createUser(createUser: CreateUserDto) {
        return this.userService.save(createUser)

    }

    @Get()
    findAllUsers() {
        return this.userService.findAll()
    }

    @Get(':id')
    async findUserById(@Param('id') id: string | number) {
        try {
            const user = await this.userService.findById(id);
            return user;
        } catch (error) {
            throw new NotFoundException(`User with id ${id} not found`);

        }
    }

    
    @MessagePattern({cmd: "findByUsername"})
    async findUserByUsername(username: string) {
        try {
            const user = await this.userService.findByUsername(username);
            return user;
        } catch (error) {
            throw new NotFoundException(`User with username ${username} not found`);

        }
    }

    @Put(":id")
    updateUserById(@Param("id") id: string | number, @Body() updateUser: UpdateUserDto) {
        return this.userService.update(id, updateUser)
    }

    @Delete(":id")
    async deleteUserById(@Param("id") id: string | number) {
        const deleted = await  this.userService.delete(id);
        if (deleted.affected === 0 ){
            throw new NotFoundException("User to delete not found")
        }
        else return "User deleted"
    }
}
