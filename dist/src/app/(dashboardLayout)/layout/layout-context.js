"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebarContext = exports.SidebarContext = void 0;
const react_1 = require("react");
exports.SidebarContext = (0, react_1.createContext)({
    collapsed: false,
    setCollapsed: () => { },
});
const useSidebarContext = () => {
    return (0, react_1.useContext)(exports.SidebarContext);
};
exports.useSidebarContext = useSidebarContext;
