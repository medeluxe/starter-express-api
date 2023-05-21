import express from "express";
import cors from "cors";
import bodyParse from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
async function start() {
    app.use(cors());
    app.use(bodyParse.json({ type: "application/json" }), bodyParse.urlencoded({ extended: true }));
    app.use(express.static(__dirname + "/public"));
    app.get("/", function (req, res) {
        console.log("[GET] 200 ok -->", req.headers.referer);
        res.sendFile(__dirname + "/public/index.html");
    });
    const PORT = 9000;
    app.listen(PORT, function () {
        console.log(`SMTP-Server up and running on port [${PORT}]`);
    });
}
function ExpressApp() {
    return app;
}
export { ExpressApp, __dirname, start };
