"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("./api/api");
const authSlice_1 = __importDefault(require("./Features/auth/authSlice"));
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const persistConfig = {
    key: "auth",
    storage: storage_1.default,
};
const persistedAuthReducer = (0, redux_persist_1.persistReducer)(persistConfig, authSlice_1.default);
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: persistedAuthReducer,
        [api_1.baseApi.reducerPath]: api_1.baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [redux_persist_1.FLUSH, redux_persist_1.REHYDRATE, redux_persist_1.PAUSE, redux_persist_1.PERSIST, redux_persist_1.PURGE, redux_persist_1.REGISTER],
        },
    }).concat(api_1.baseApi.middleware),
});
// export default store;
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
