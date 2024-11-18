"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexios_http_1 = require("nexios-http");
const nexiosInstance = new nexios_http_1.Nexios({
    baseURL: "http://localhost:5000/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
exports.default = nexiosInstance;
