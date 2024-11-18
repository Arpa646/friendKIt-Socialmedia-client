"use strict";
"use client";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentUser = exports.useCurrentToken = exports.logout = exports.setUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    user: null,
    token: null,
};
const authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            // Log the user and token to the console
            console.log("User:", user);
            console.log("Token:", token);
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});
_a = authSlice.actions, exports.setUser = _a.setUser, exports.logout = _a.logout;
exports.default = authSlice.reducer;
const useCurrentToken = (state) => state.auth.token;
exports.useCurrentToken = useCurrentToken;
const useCurrentUser = (state) => state.auth.user;
exports.useCurrentUser = useCurrentUser;
