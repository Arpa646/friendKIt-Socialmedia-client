"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const next_auth_1 = __importDefault(require("next-auth"));
const google_1 = __importDefault(require("next-auth/providers/google"));
const handler = (0, next_auth_1.default)({
    providers: [
        (0, google_1.default)({
            clientId: "85401385414-h4m4eicsvahull3tvap3rhfqmd89tgsl.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    callbacks: {
        async signIn({ profile, account }) {
            try {
                if (!profile || !account) {
                    return false;
                }
                if (account.provider === "google") {
                    // Custom login logic
                    console.log("User signed in with Google:", profile);
                    return true;
                }
                return false;
            }
            catch (error) {
                console.error("Error during sign-in:", error);
                return false;
            }
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: "your-secret-key", // Replace with a proper secret
});
exports.GET = handler;
exports.POST = handler;
