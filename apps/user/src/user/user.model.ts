import { types } from "cassandra-driver";

export class User {
    id: types.Uuid;
    username: string;
    password: string;

}