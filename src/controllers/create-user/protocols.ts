import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";

export interface ICreateUserController {
    handle(httRequest: HttpRequest<CreateUserParams>): Promise <HttpResponse<User>>
}

export interface CreateUserParams {
    firstName: string,
    LastName: string,
    email: string, 
    password: string
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise <User>
}