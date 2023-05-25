"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_actions_1 = __importDefault(require("../config/bot_actions"));
const getTextAndActionValues = () => {
    const menuActionValues = Object.keys(bot_actions_1.default).map((key) => { var _a; return (_a = bot_actions_1.default[key]) === null || _a === void 0 ? void 0 : _a.action; });
    const menuTextValues = Object.keys(bot_actions_1.default).map((key) => { var _a; return (_a = bot_actions_1.default[key]) === null || _a === void 0 ? void 0 : _a.text; });
    return [...menuActionValues, ...menuTextValues];
};
exports.default = getTextAndActionValues;
