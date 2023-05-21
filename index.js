import { startServer } from "./lib/server.js"
import { connectDB } from "./lib/db/connect.js"
import { ExpressApp } from "./lib/setups.js"

import dotenv from "dotenv"

dotenv.config()

connectDB()
    .then(async (data) => {
        console.log("db connection secured")

        const PORT = process.env.PORT || 9000

        const app = ExpressApp()

        app.listen(PORT, function () {
            console.log(`SMTP-Server up and running on port [${PORT}]`)
            startServer()
        })
    })
    .catch((error) => {
        console.log(error)
    })
