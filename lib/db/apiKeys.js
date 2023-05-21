import mongoose from "mongoose";
const SCHEMA = new mongoose.Schema({
    api_key: { type: String },
    subscription: {
        _type: String,
        quota: Number,
        isActive: {
            type: Boolean,
            defaults: true,
        },
        requests: { type: Number, defaults: 0 },
    },
    user_id: { type: String },
});
const ApiSubscriptions = mongoose.model("SubscriptionAccount", SCHEMA, undefined, {
    overwriteModels: true,
});
export default ApiSubscriptions;
