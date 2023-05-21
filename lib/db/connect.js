import mongoose from "mongoose";
async function connectDB() {
    const MONGO_URL = process.env.MONGO_URL;
    let connectionString;
    if (MONGO_URL) {
        connectionString = MONGO_URL;
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
