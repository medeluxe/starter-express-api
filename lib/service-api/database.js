import path from "path";
import { fileURLToPath } from "url";
import ApiSubscriptions from "../db/apiKeys.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_KEYS = () => {
    const all = async () => {
        const account = await ApiSubscriptions.find({});
        return account;
    };
    const find = async (query) => {
        const account = await ApiSubscriptions.findOne(query);
        return account;
    };
    const exist = async (api_key) => {
        return !!(await get(api_key));
    };
    const get = async (api_key) => {
        const account = await ApiSubscriptions.findOne({ api_key });
        return account;
    };
    const update = async (api_key, payload) => {
        const account = await ApiSubscriptions.findOneAndUpdate({ api_key }, payload);
        return account;
    };
    const set = async (payload) => {
        const account = await ApiSubscriptions.create(payload);
        return account;
    };
    return { all, get, set, exist, update, find };
};
const DATABASE = {
    api_keys: API_KEYS(),
};
export default DATABASE;
