import express from "express";
import cors from "cors";
import bodyParse from "body-parser";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(bodyParse.json({ type: "application/json" }), bodyParse.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
    console.log("[GET] 200 ok -->", req.headers.referer);
    res.sendFile(__dirname + "/public/index.html");
});
const PORT = 9000;
const httpServer = http.createServer(app);
function ExpressApp() {
    return app;
}
function start() {
    httpServer.listen(PORT, function () {
        console.log(`SMTP-Server up and running on port [${PORT}]`);
    });
}
export { ExpressApp, start, __dirname };
