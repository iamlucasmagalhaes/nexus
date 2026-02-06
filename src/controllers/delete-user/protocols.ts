import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise <User>
}

export interface IDeleteUserController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}
