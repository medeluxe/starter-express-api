import mongoose from "mongoose";
import { logInfo } from "../logger.js";
async function connectDB() {
    const MONGO_URL = process.env.MONGO_URL;
    let connectionString;
    if (MONGO_URL) {
        connectionString = MONGO_URL;
        logInfo("Connecting to db...");
        return Promise.resolve(mongoose.connect(connectionString));
    }
    else {
        return Promise.reject({
            message: "Provide the environment variables to connect to db",
        });
    }
}
export { connectDB };
