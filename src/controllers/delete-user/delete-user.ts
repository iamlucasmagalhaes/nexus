import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type { IDeleteUserController, IDeleteUserRepository } from "./protocols.js";

export class DeleteUserController implements IDeleteUserController {
    deleteUserRepository: IDeleteUserRepository

    constructor (deleteUserRepository: IDeleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository
    }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id

            if(!id){
                return {
                    statusCode: 400,
                    body: "Missing user id"
                }
            }

            const user = await this.deleteUserRepository.deleteUser(id)

            return{
                statusCode: 200,
                body: user
            }
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                body: "Something went Wrong",
            }
        }
    }
}
    