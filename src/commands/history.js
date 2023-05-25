"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_messages_1 = __importDefault(require("../config/bot_messages"));
const services_1 = require("../db/services");
const prepareHistory_1 = __importDefault(require("../utils/prepareHistory"));
const prepareUserInfo_1 = __importDefault(require("../utils/prepareUserInfo"));
const history = (bot) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    const user = (0, prepareUserInfo_1.default)(message);
    bot.sendChatAction(chatId, "typing");
    const queries = yield services_1.QueryService.getUserQueries({ id: user.inner_id });
    if (!queries) {
        return yield bot.sendMessage(chatId, bot_messages_1.default.error);
    }
    const reply = (0, prepareHistory_1.default)(queries);
    yield bot.sendMessage(chatId, reply, { parse_mode: "HTML" });
});
exports.default = history;
