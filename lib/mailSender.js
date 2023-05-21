import { createTransport } from "nodemailer";
const ENV = {
    TECH_DELUXE_MAILER_EMAIL: "techdeluxe00@gmail.com",
    TECH_DELUXE_MAILER_PASSWORD: "vjfhankfiuzgpqiu",
    NODE_ENV: "development",
};
export async function sendMail({ subject, html, to_mail, from_host, name, }) {
    const _message = {
        from: ` "${name}" <${from_host || ENV.TECH_DELUXE_MAILER_EMAIL}>`,
        to: to_mail,
        subject: subject,
        html: html,
    };
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: ENV.NODE_ENV === "production",
        auth: {
            user: ENV.TECH_DELUXE_MAILER_EMAIL,
            pass: ENV.TECH_DELUXE_MAILER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: ENV.NODE_ENV === "production",
        },
    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(_message, (error) => {
            if (!error) {
                resolve({
                    message: "Message successfully sended",
                    success: true,
                });
            }
            else {
                reject({
                    error: true,
                    message: error.message || "Failure. Unable to send the mail",
                });
                console.error(error);
            }
        });
    });
}
