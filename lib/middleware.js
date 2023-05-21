import ApiKeys from "./service-api/apiKey.js";
import DATABASE from "./service-api/database.js";
import { logInfo } from "./logger.js";
const MAIL_TYPES = ["email", "contact"];
const freeRoutes = ["/subscribe", "/rules"];
function isFreeRoute(req) {
    return !!freeRoutes.includes(req.url);
}
export async function loggerMiddleware(req, res, next) {
    const url = req.url;
    const method = req.method;
    const origin = req.headers.origin;
    const log = `[${method}] ${url} || ${origin}`;
    logInfo(log);
    res.status(200).json({ log });
    res.end();
}
async function validateAPIkey(req, res, next) {
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
    const account = await DATABASE.api_keys.get(hashedToken);
    if (account?.subscription.isActive) {
        if (account.subscription.quota === 0) {
            res.status(400).json({
                message: "You have reached you max quota",
                error: true,
            });
            res.end();
            DATABASE.api_keys.update(hashedToken, {
                subscription: {
                    isActive: false,
                    quota: 0,
                },
            });
            return;
        }
        DATABASE.api_keys.update(hashedToken, {
            subscription: {
                isActive: true,
                quota: account.subscription.quota - 1,
                requests: account.subscription.requests + 1,
            },
        });
        return next();
    }
    res.status(403).json({
        message: "Invalid or expired api key",
    });
}
function handleMailingType(req, res, next) {
    const { mailType = 'contact' } = req.body;
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
            message: "html or content parameter is required.",
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
export function runMiddleware() {
    return [
        validateAPIkey,
        handleMailingType,
        handleMailingContents,
        handleMailingRecipientEmail,
    ];
}
