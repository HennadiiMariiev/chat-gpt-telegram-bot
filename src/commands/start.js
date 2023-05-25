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
const bot_menu_1 = require("../config/bot_menu");
const prepareUserInfo_1 = __importDefault(require("../utils/prepareUserInfo"));
const bot_messages_1 = __importDefault(require("../config/bot_messages"));
const config_1 = require("../config/config");
const start = (bot) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    const user = (0, prepareUserInfo_1.default)(message);
    const userInfo = user.username ? user.first_name + " " + user.username : user.first_name;
    const msgToOwner = `<b>😎 New user</b>\n\t👤 ${userInfo}\n\t🤖 isBot: ${user.is_bot ? "yes 👎🏻" : "no 👍🏻"}\nhas just started 🔥`;
    bot.sendChatAction(chatId, "typing");
    yield services_1.UserService.addNewUser(user);
    yield bot.sendMessage(config_1.OWNER_ID, msgToOwner, {
        parse_mode: "HTML",
    });
    yield bot.sendMessage(chatId, bot_messages_1.default.welcome, bot_menu_1.mainMenu);
});
exports.default = start;
