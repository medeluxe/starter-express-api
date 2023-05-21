import { randomBytes, createHash } from "crypto";
import DATABASE from "./database.js";
function generate(email, save = true) {
    const _apiKey = randomBytes(28).toString("base64");
    if (save) {
        const hashedApiKey = hashAPIKey(_apiKey);
        if (DATABASE.api_keys.get(hashedApiKey)) {
            return generate(email);
        }
        else {
            DATABASE.api_keys.set({
                [hashedApiKey]: {
                    isActive: true,
                    quota: 5,
                    email: hashAPIKey(email),
                },
            });
        }
    }
    console.log(DATABASE.api_keys.all());
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
