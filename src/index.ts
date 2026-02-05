import express from "express"
import {config} from "dotenv"
import { GetUsersController } from "./controllers/get-users/get-users.js"
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js"
import { MongoClient } from "./database/mongo.js"

const main = async () => {
    config()

    const app  = express()

    const port = process.env.PORT || 8000

    await MongoClient.connect()

    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository
        const getUsersController = new GetUsersController(mongoGetUsersRepository)

        const response = await getUsersController.handle()

        res.status(response.statusCode).send(response.body)
    })

    app.listen(port, () => console.log(`listening on port ${port}!`))
}

main()