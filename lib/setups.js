import express from "express";
import cors from "cors";
import bodyParse from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { isRapidAPIRequest, rapidApiMiddleware } from "./middleware/rapidApi.js";
import { defaultMiddleware } from "./middleware/default.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
async function start() {
    app.use(cors());
    app.use(express.static(__dirname + "/public"));
    app.use(bodyParse.urlencoded({ extended: true }));
    app.use(bodyParse.json({ type: "application/json" }));
    app.use((req, res, next) => {
        if (isRapidAPIRequest(req)) {
            return rapidApiMiddleware(req, res, next);
        }
        return defaultMiddleware(req, res, next);
    });
    app.get("/test", function (req, res) {
        res.status(200).json({ welcome: "everything works fine" });
    });
    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });
}
function ExpressApp() {
    return app;
}
export { ExpressApp, __dirname, start };
