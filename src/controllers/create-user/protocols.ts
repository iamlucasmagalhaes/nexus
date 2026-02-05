import type { User } from "../../models/user.js";

export interface CreateUserParams {
    firstName: string,
    LastName: string,
    email: string, 
    password: string
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise <User>
}