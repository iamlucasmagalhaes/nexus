import express from "express"
import {config} from "dotenv"
import { GetUsersController } from "./controllers/get-users/get-users.js"
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js"
import { MongoClient } from "./database/mongo.js"
import { MongoCreateUsersRepository } from "./repositories/create-users/mongo-create-users.js"
import { CreateUserController } from "./controllers/create-user/create-user.js"

const main = async () => {
    config()

    const app  = express()

    app.use(express.json())

    const port = process.env.PORT || 8000

    await MongoClient.connect()

    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository
        const getUsersController = new GetUsersController(mongoGetUsersRepository)

        const response = await getUsersController.handle()

        res.status(response.statusCode).send(response.body)
    })

    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUsersRepository()
        const createUserController = new CreateUserController(mongoCreateUserRepository)

        const response = await createUserController.handle({
            body: req.body
        })

        res.status(response.statusCode).send(response.body)
    })

    app.listen(port, () => console.log(`listening on port ${port}!`))
}

main()