import { Inject, Injectable } from "@nestjs/common";
import { mapping } from "cassandra-driver";
import { CassandraService } from "src/cassandra/cassandra.service";
import { User } from "./user.model";


@Injectable()
export class UserRepository {
    private userMapper: any;
    constructor(private cassandraService: CassandraService){
        this.userMapper = cassandraService.mapper.forModel('users')
    }

    async createNewUser() {
        await this.userMapper.insert({"id" :"00000000-0000-0000-0000-000000000055", "email": "2", "password": "3"})
    }
    

}