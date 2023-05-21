import { startServer } from "./lib/server.js"
import { connectDB } from "./lib/db/connect.js"
import { ExpressApp } from "./lib/setups.js"
import { loggerMiddleware } from "./lib/middleware.js"

import dotenv from "dotenv"
import { logError, logSuccess } from "./lib/logger.js"

dotenv.config()

console.log()
connectDB()
    .then(async (data) => {
        const PORT = process.env.PORT || 9000

        const app = ExpressApp()

        app.use(loggerMiddleware)

        app.listen(PORT, function () {
            console.log()
            logSuccess(`DATABASE connection secured 👍👍👍`)
            logSuccess(`Server up and running on port [${PORT}]`)
            startServer()
        })
    })
    .catch((error) => {
        logError(error?.message || error)
    })
