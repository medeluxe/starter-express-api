import ApiKeys from "./service-api/apiKey.js";
import DATABASE from "./service-api/database.js";
import { ExpressApp } from "./setups.js";
const MAIL_TYPES = ["email", "contact"];
const freeRoutes = ["/subscribe", "/rules"];
function isFreeRoute(req) {
    return !!freeRoutes.join(" ").match(new RegExp(req.url, "gi"));
}
function validateAPIkey(req, res, next) {
    const { authorization } = req.headers;
    if (isFreeRoute(req))
        return next();
    const tokens = authorization?.split("Bearer ")[1];
    if (!tokens) {
        res.status(403).json({
            message: "You are unauthorize for this request",
            error: true,
        });
        res.end();
        return;
    }
    const hashedToken = ApiKeys.hashAPIKey(tokens);
    const account = DATABASE.api_keys.get(hashedToken);
    if (account?.isActive) {
        if (account.quota === 0) {
            res.status(400).json({
                message: "You have reached you max quota",
                error: true,
            });
            res.end();
            DATABASE.api_keys.set({
                [hashedToken]: {
                    isActive: false,
                    quota: 0,
                },
            });
            return;
        }
        DATABASE.api_keys.set({
            [hashedToken]: {
                isActive: true,
                quota: account.quota - 1,
            },
        });
        return next();
    }
    res.status(403).json({
        message: "Invalid or expired api key",
    });
}
function handleMailingType(req, res, next) {
    const { mailType } = req.body;
    if (isFreeRoute(req))
        return next();
    if (mailType && MAIL_TYPES.includes(mailType))
        return next();
    else {
        res.status(400).json({
            message: "Invalid mail type or mail type not supported",
            error: true,
        });
        res.end();
    }
}
function handleMailingContents(req, res, next) {
    const { html, content } = req.body;
    if (isFreeRoute(req))
        return next();
    if (html && (!html.startsWith("<") || !html.endsWith(">") || html.length < 15)) {
        res.status(400).json({
            message: "The html content is required and it is invalid or too short in this request",
            error: true,
        });
        res.end();
        return;
    }
    if (!content) {
        res.status(400).json({
            message: "html or content parameter is required",
            error: true
        });
        res.end();
        return;
    }
    return next();
}
function handleMailingRecipientEmail(req, res, next) {
    const { to } = req.body;
    if (isFreeRoute(req))
        return next();
    if (!to || !['string', 'array'].includes(typeof (to || 0))) {
        res.status(400).json({
            message: "The email which the message to be send to required",
            error: true
        });
        res.end();
        return;
    }
    next();
}
const app = ExpressApp();
export function runMiddleware() {
    app.use(validateAPIkey, handleMailingType, handleMailingContents, handleMailingRecipientEmail);
}
