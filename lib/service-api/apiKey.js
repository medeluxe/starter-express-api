import { randomBytes, createHash } from "crypto";
import DATABASE from "./database.js";
async function generate(email, save = true) {
    const _apiKey = randomBytes(28).toString("base64");
    if (save) {
        const hashedApiKey = hashAPIKey(_apiKey);
        const account = await DATABASE.api_keys.get(hashedApiKey);
        if (account) {
            return await generate(email);
        }
        else {
            await DATABASE.api_keys.set({
                api_key: hashedApiKey,
                subscription: {
                    quota: 10,
                    isActive: true,
                    requests: 0,
                    _type: "Basic",
                },
                user_id: hashAPIKey(email),
            });
        }
    }
    return _apiKey;
}
function hashAPIKey(key) {
    const hashKey = createHash("sha256").update(salt(key)).digest("base64");
    return hashKey;
}
function salt(apiKey) {
    const saltA = ",.@#_-\\//+*fd";
    const saltB = saltA.split("").reverse().join();
    return `${saltA}${apiKey}${saltB}`;
}
const ApiKeys = { generate, hashAPIKey };
export default ApiKeys;
