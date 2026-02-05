import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols.js";
import validator from 'validator'

export class CreateUserController implements ICreateUserController {
    createUserRepository: ICreateUserRepository

    constructor (createUserRepository: ICreateUserRepository){
        this.createUserRepository = createUserRepository
    }

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
       try {
            if(!httpRequest.body){
                return{
                    statusCode: 400,
                    body: "Please specify a body"
                }
            }

            //validar se o email é valido
            const emailIsValid = validator.isEmail(httpRequest.body!.email)

            if(!emailIsValid){
                return {
                    statusCode: 400,
                    body: "E-mail is invalid"
                }
            }
             
            const user = await this.createUserRepository.createUser(httpRequest.body)
            return {
                statusCode: 201,
                body: user
            }
        
       } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong!"
            }
       }
    }
    
}