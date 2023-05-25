"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPrompt = (action, fullMessage) => {
    if (!fullMessage.includes(action)) {
        return fullMessage;
    }
    const idx = (fullMessage === null || fullMessage === void 0 ? void 0 : fullMessage.indexOf(action)) + action.length + "\n".length;
    return fullMessage === null || fullMessage === void 0 ? void 0 : fullMessage.slice(idx);
};
exports.default = getPrompt;
