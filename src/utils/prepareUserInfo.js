"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prepareUserInfo = (message) => {
    var _a, _b, _c, _d, _e;
    return {
        inner_id: (_b = (_a = message.from) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString(),
        first_name: (_c = message.from) === null || _c === void 0 ? void 0 : _c.first_name,
        username: (_d = message.from) === null || _d === void 0 ? void 0 : _d.username,
        is_bot: (_e = message.from) === null || _e === void 0 ? void 0 : _e.is_bot,
    };
};
exports.default = prepareUserInfo;
