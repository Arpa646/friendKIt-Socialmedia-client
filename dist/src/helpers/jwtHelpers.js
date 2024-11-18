"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.jwtVerify = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = require("jwt-decode");
const jwtVerify = (token) => {
    console.log("hjsJH73jskw92ksldkw9shU37JdkjGd&*78SjDlKsd7#*(ksLdslK");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "jjjnn");
        console.log(decoded, "decoded");
        return decoded;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.jwtVerify = jwtVerify;
const decode = (token) => {
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    return decoded;
};
exports.decode = decode;
