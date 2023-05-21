import { randomBytes, createHash } from "crypto";
import Database from "./database.js";
function generate(email, save = true) {
    const _apiKey = randomBytes(28).toString("base64");
    if (save) {
        const hashedApiKey = hashAPIKey(_apiKey);
        if (Database.api_keys.get(hashedApiKey)) {
            return generate(email);
        }
        else {
            Database.api_keys.set({
                [hashedApiKey]: {
                    isActive: true,
                    quota: 5,
                    email: hashAPIKey(email),
                },
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
