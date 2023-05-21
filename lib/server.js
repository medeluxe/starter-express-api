import { start } from "./setups.js";
import { runMiddleware } from "./middleware.js";
import { runSmtpServer } from "./smtp.js";
import { runServices } from "./service-api/index.js";
console.log("starting app...");
function startServer() {
    start();
    runMiddleware();
    runSmtpServer();
    runServices();
    console.log("app started!");
}
export { startServer };
