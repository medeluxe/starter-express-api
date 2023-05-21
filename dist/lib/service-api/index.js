import { ExpressApp } from "../setups.js";
import ApiKeys from "./apiKey.js";
import DATABASE from "./database.js";
const app = ExpressApp();
function runServices() {
    const middleware = (req, res, next) => {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                message: "Email is required for subscription",
            });
            return res.end();
        }
        else {
            if (email === 'abc@mail.com') {
                const api_key = ApiKeys.generate(email);
                res.status(200).json({
                    success: true,
                    data: {
                        api_key,
                        quota: 10,
                    },
                });
                return res.end();
            }
            const hashEmail = ApiKeys.hashAPIKey(email);
            const api_keys = DATABASE.api_keys.all();
            const accounts = Object.values(api_keys);
            const exist = accounts.find(_user => _user.email === hashEmail);
            if (exist) {
                res.status(400).json({
                    message: "Account with this email already exist",
                    error: true,
                    data: {
                        quota: exist.quota
                    },
                });
                return res.end();
            }
        }
        next();
    };
    app.post("/subscribe", middleware, (req, res) => {
        const { email } = req.body;
        const aplKey = ApiKeys.generate(email);
        res.status(200).json({ success: true, aplKey });
    });
}
export { runServices };
