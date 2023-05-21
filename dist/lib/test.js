"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const api_key = "e56be18c7amsh72c2e5e4c605441p1fb84fjsn0b93d31a56d0";
const options = {
    method: "GET",
    url: "https://mail-sender-medeluxe.p.rapidapi.com/rules",
    headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "mail-sender-medeluxe.p.rapidapi.com",
    },
};
try {
    const response = await axios_1.default.request(options);
    console.log(response.data);
}
catch (error) {
    console.error(error.message || error);
}
