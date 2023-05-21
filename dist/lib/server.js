import { start } from "./setups.js";
import { runMiddleware } from "./middleware.js";
import { runSmtpServer } from "./smtp.js";
import { runServices } from "./service-api/index.js";
function startServer() {
    start();
    runMiddleware();
    runSmtpServer();
    runServices();
}
export { startServer };
