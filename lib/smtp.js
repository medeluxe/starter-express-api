import { sendMail } from "./mailSender.js";
import { ExpressApp } from "./setups.js";
import { doc } from "./templates.js";
const app = ExpressApp();
app.get("/rules", (req, res) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json({
        body: {
            name: String(),
            subject: String(),
            mailType: ["contact", "email"],
            to: [String(), [String()]],
            from: [String(), undefined],
            html: [String(), undefined],
            content: [String(), undefined],
        },
    });
});
const runSmtpServer = function () {
    app.post("/send-mail", async function (req, res) {
        const { name, mailType = "contact", content, subject, to, from, html, } = req.body;
        let success;
        let response = {};
        let error;
        const _subject = subject || "Medluxe Mailer Service";
        switch (mailType) {
            case "contact":
                try {
                    response = await sendMail({
                        html: html ||
                            doc({
                                from: from,
                                content: content,
                                heading: _subject,
                            }),
                        to_mail: to,
                        from_host: from,
                        name: name || "MedLuxe",
                        subject: subject || "Medluxe Mailer Service",
                    });
                    success = response.success;
                }
                catch (err) {
                    error = err.message;
                }
                break;
            default:
                break;
        }
        if (success) {
            res.status(200).json({ message: response.message, success: true });
            res.end(0);
            console.log("[POST] 200 ok -->", req.headers.referer);
            return;
        }
        else if (error) {
            res.status(400).json({ error });
            res.end(0);
            return;
        }
        else {
            res.status(400).json({
                message: "Uncaught Error Occurred",
            });
            res.end();
        }
    });
};
export { runSmtpServer };
