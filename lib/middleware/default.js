import ApiKeys from "../service-api/apiKey.js";
import DATABASE from "../service-api/database.js";
export const defaultMiddleware = async function (req, res, next) {
    if (req.url.match(/subscribe/g))
        return next();
    if (req.url.match(/rules/g))
        return next();
    return validateAPIkey(req, res, next);
};
const validateAPIkey = async function (req, res, next) {
    const { authorization } = req.headers;
    const _apiKey = authorization?.split("Bearer ")[1];
    if (!_apiKey) {
        res.status(403).json({
            message: "You are unauthorize for this request",
            error: true,
            reason: "Expected an api-key for this request but got none",
        });
        res.end();
        return;
    }
    const hashedToken = ApiKeys.hashAPIKey(_apiKey);
    const account = await DATABASE.api_keys.get(hashedToken);
    if (account?.subscription.isActive) {
        return updateApiKey(account, hashedToken, res, next);
    }
    res.status(403).json({
        error: true,
        reason: "The api-key you provided is either incorrect or invalid. And cannot use",
        message: "Invalid or expired api key",
    });
};
export function updateApiKey(account, apiKey, res, next) {
    if (account.subscription.quota === 0) {
        res.status(400).json({
            message: "You are out of quotas",
            error: true,
            reason: "You don't have any request left with your subscription",
        });
        DATABASE.api_keys.update(apiKey, {
            subscription: {
                isActive: false,
                quota: 0,
            },
        });
        return res.end();
    }
    DATABASE.api_keys.update(apiKey, {
        subscription: {
            isActive: true,
            quota: account.subscription.quota - 1,
            requests: account.subscription.requests + 1,
        },
    });
    return next();
}
