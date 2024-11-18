"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
const react_redux_1 = require("react-redux");
const jwt_decode_1 = require("jwt-decode");
// Create a custom hook to get the user details from the token
const useUser = () => {
    // Get the token from Redux state with the correct typing
    const token = (0, react_redux_1.useSelector)((state) => state.auth.token);
    // Decode the token to extract user details, if the token exists
    const user = token ? (0, jwt_decode_1.jwtDecode)(token) : null;
    // Return user details or a guest fallback
    return {
        role: user?.role || "Guest",
        userId: user?.useremail || "Unknown",
        email: user?.userId || "No email",
        token: token
    };
};
exports.useUser = useUser;
