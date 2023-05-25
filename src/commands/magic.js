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
const bot_constants_1 = require("../config/bot_constants");
const prepareUserInfo_1 = __importDefault(require("../utils/prepareUserInfo"));
const bot_messages_1 = __importDefault(require("../config/bot_messages"));
const refreshUserLimit = (bot) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    const user = (0, prepareUserInfo_1.default)(message);
    bot.sendChatAction(chatId, "typing");
    const limit = yield services_1.UserService.refreshLimit({ inner_id: user.inner_id });
    if (!limit) {
        yield bot.sendMessage(chatId, bot_messages_1.default.error);
    }
    yield bot.sendAnimation(chatId, bot_constants_1.MAGIC_STICKER_ID);
    yield bot.sendMessage(chatId, bot_messages_1.default.magic);
});
exports.default = refreshUserLimit;
