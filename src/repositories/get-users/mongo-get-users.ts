import type { IGetUsersRepository } from "../../controllers/get-users/protocols.js";
import type { User } from "../../models/user.js";

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [{
            firstName: "Lucas",
            lastName: "Magalhães",
            email: "lucas@email.com",
            password: "1234"
        }]
    }
}