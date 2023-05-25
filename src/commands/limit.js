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
const services_1 = require("../db/services");
const prepareUserInfo_1 = __importDefault(require("../utils/prepareUserInfo"));
const limit = (bot) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    const user = (0, prepareUserInfo_1.default)(message);
    const limit = yield services_1.UserService.getLimit({ inner_id: user.inner_id });
    bot.sendChatAction(chatId, "typing");
    yield bot.sendMessage(chatId, "<b>Your limit:</b>\n" + limit + " requests left", { parse_mode: "HTML" });
});
exports.default = limit;
