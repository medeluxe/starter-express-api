import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __API_KEYS = () => JSON.parse(fs
    .readFileSync(path.resolve(__dirname, "keys.json"))
    .toString("utf-8") || "{}");
const API_KEYS = {
    all: () => {
        return __API_KEYS();
    },
    exist(name) {
        return !!__API_KEYS()[name];
    },
    get: (name) => {
        return __API_KEYS()[name];
    },
    set: async (payload) => {
        fs.writeFileSync(path.resolve(__dirname, "keys.json"), JSON.stringify({ ...__API_KEYS(), ...payload }, null, 4));
        return __API_KEYS();
    },
};
const DATABASE = {
    api_keys: API_KEYS,
};
export default DATABASE;
