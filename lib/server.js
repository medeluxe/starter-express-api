import { start } from "./setups.js";
import { runSmtpServer } from "./smtp.js";
import { runServices } from "./service-api/index.js";
async function startServer() {
    await start();
    await runServices();
    await runSmtpServer();
}
export { startServer };
