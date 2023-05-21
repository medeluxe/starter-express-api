import mongoose from "mongoose";
async function connectDB() {
    const MONGO_URL = process.env.MONGO_URL;
    const MONGO_CLIENT_URL = process.env.MONGO_CLIENT_URL;
    const devEnv = process.env.NODE_ENV === "development";
    let connectionString;
    if (MONGO_URL || MONGO_CLIENT_URL) {
        if (MONGO_URL)
            connectionString = MONGO_URL;
        else
            connectionString = MONGO_CLIENT_URL;
        if (MONGO_URL) {
            console.log("connecting to LOCAL db");
        }
        else
            console.log("connecting to REMOTE db");
        return Promise.resolve(mongoose.connect(connectionString));
    }
    else {
        return Promise.reject({
            message: "Provide the environment variables to connect to db",
        });
    }
}
export { connectDB };
