import { ExpressApp } from "../setups.js";
import ApiKeys from "./apiKey.js";
import DATABASE from "./database.js";
import { logDefault } from "../logger.js";
const app = ExpressApp();
async function runServices() {
    const middleware = async (req, res, next) => {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                message: "Email is required for subscription",
            });
            return res.end();
        }
        else {
            if (email === 'abc@mail.com') {
                const api_key = await ApiKeys.generate(email, false);
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
            const account = await DATABASE.api_keys.find({ user_id: hashEmail });
            const exist = !!account;
            if (exist) {
                res.status(400).json({
                    message: "Account with this email already exist",
                    error: true,
                });
                return res.end();
            }
        }
        next();
    };
    app.post("/subscribe", middleware, async (req, res) => {
        const { email } = req.body;
        const aplKey = await ApiKeys.generate(email);
        res.status(200).json({ success: true, aplKey });
    });
    logDefault("Service started 👍");
    return Promise.resolve(true);
}
export { runServices };
