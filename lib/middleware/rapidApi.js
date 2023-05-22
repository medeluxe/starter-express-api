import { logDefault, logInfo } from "../logger.js";
export function isRapidAPIRequest(req) {
    const headers = req.headers;
    const isRapidAPI = Boolean(headers["x-rapidapi-host"]);
    logInfo("[RapidAPI] request hits");
    if (isRapidAPI)
        return true;
    return false;
}
export const rapidApiMiddleware = (req, res, next) => {
    const headers = req.headers;
    const account = { subscription: {} };
    account.api_key = headers["x-rapidapi-request-id"];
    account.subscription._type = headers["x-rapidapi-subscription"];
    account.user_id = headers["x-rapidapi-user"];
    const browser = headers["sec-ch-ua"] || headers["user-agent"];
    const device = headers["sec-ch-ua-platform"];
    console.log();
    logDefault("RapidApiRequest");
    console.log();
    logDefault({
        account,
        device,
        browser,
    });
    next();
};
