import dotenv from "dotenv";
import { start } from "./setups.js";
import { connectDB } from "./db/connect.js";
import { runSmtpServer } from "./smtp.js";
import { runServices } from "./service-api/index.js";
dotenv.config();
async function startServer() {
    connectDB()
        .then(async (data) => {
        console.log("db connection secured");
        if (data) {
            start();
            await runServices();
            await runSmtpServer();
        }
    })
        .catch((error) => {
        console.log(error);
        throw new Error(error.message);
    });
}
export { startServer };
