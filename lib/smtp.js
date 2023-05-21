import { sendMail } from "./mailSender.js";
import { ExpressApp } from "./setups.js";
import { doc } from "./templates.js";
import { runMiddleware } from "./middleware.js";
const app = ExpressApp();
app.get("/rules", (req, res) => {
    res.setHeader("content-type", "application/json");
    const json = {
        name: "/* A name to display as the mail sender */",
        subject: "/* The subject of the email */",
        mailType: "/* The type of email (e.g., 'text', 'html') */",
        to: "/* The recipient(s) of the email (single email address or an array of email addresses) */",
        from: "/* The sender's email address (optional) */",
        content: "/* The content of the email (text version) */",
        html: "/* The HTML content of the email (optional) */",
        _html: "/* The processed HTML content of the email (generated internally) */",
    };
    res.status(200).json({
        rules: json,
    });
});
const runSmtpServer = async function () {
    app.post("/send-mail", ...runMiddleware(), async function (req, res) {
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
    console.log("smtp-lib stated");
    return Promise.resolve(true);
};
export { runSmtpServer };
