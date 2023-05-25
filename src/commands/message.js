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
const getImage_1 = __importDefault(require("../chatGPT/getImage"));
const getResponse_1 = __importDefault(require("../chatGPT/getResponse"));
const bot_actions_1 = __importDefault(require("../config/bot_actions"));
const bot_messages_1 = __importDefault(require("../config/bot_messages"));
const services_1 = require("../db/services");
const prepareUserInfo_1 = __importDefault(require("../utils/prepareUserInfo"));
const getPrompt_1 = __importDefault(require("../utils/getPrompt"));
const getEmbedding_1 = __importDefault(require("../chatGPT/getEmbedding"));
const getTextAndActionValues_1 = __importDefault(require("../utils/getTextAndActionValues"));
const config_1 = require("../config/config");
const menuValues = (0, getTextAndActionValues_1.default)();
const message = (bot, openAI) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    const txt = message.text;
    try {
        if (txt && menuValues.includes(txt)) {
            return;
        }
        if (txt === null || txt === void 0 ? void 0 : txt.includes(bot_actions_1.default.question.text)) {
            return yield processTextQuery(bot, message, openAI);
        }
        if (txt === null || txt === void 0 ? void 0 : txt.includes(bot_actions_1.default.image.text)) {
            return yield processImageQuery(bot, message, openAI);
        }
        if (txt === null || txt === void 0 ? void 0 : txt.includes(bot_actions_1.default.embedding.text)) {
            return yield processTextToEmbedding(bot, message, openAI);
        }
        if (txt && txt.trim().length >= config_1.MIN_MESSAGE_LENGTH) {
            return yield processTextQuery(bot, message, openAI, true);
        }
        if (message === null || message === void 0 ? void 0 : message.voice) {
            return yield bot.sendMessage(chatId, bot_messages_1.default.audio, { parse_mode: "Markdown" });
        }
        bot.sendChatAction(chatId, "typing");
        yield bot.sendMessage(chatId, bot_messages_1.default.short_message, { parse_mode: "Markdown" });
    }
    catch (error) {
        yield bot.sendMessage(chatId, bot_messages_1.default.error, { parse_mode: "Markdown" });
    }
});
function processTextQuery(bot, message, openAI, isFullMessage) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = message.chat.id;
        const fullMessage = message.text;
        const user = (0, prepareUserInfo_1.default)(message);
        bot.sendChatAction(chatId, "typing");
        const prompt = (0, getPrompt_1.default)(bot_actions_1.default.question.text, fullMessage);
        const query = yield services_1.QueryService.addQuery({ user_id: user.inner_id, message: prompt, type: "question" });
        if (!query) {
            return yield bot.sendMessage(chatId, bot_messages_1.default.exceedLimit);
        }
        const messageStr = isFullMessage ? fullMessage : prompt;
        const response = yield (0, getResponse_1.default)(messageStr, openAI);
        yield bot.sendMessage(chatId, (_a = response) !== null && _a !== void 0 ? _a : bot_messages_1.default.error, { parse_mode: "Markdown" });
    });
}
function processImageQuery(bot, message, openAI) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = message.chat.id;
        const fullMessage = message.text;
        const user = (0, prepareUserInfo_1.default)(message);
        bot.sendChatAction(chatId, "upload_photo");
        const prompt = (0, getPrompt_1.default)(bot_actions_1.default.image.text, fullMessage);
        const query = yield services_1.QueryService.addQuery({ user_id: user.inner_id, message: prompt, type: "image" });
        if (!query) {
            return yield bot.sendMessage(chatId, bot_messages_1.default.exceedLimit);
        }
        const response = yield (0, getImage_1.default)(prompt, openAI);
        yield bot.sendMessage(chatId, (_a = response) !== null && _a !== void 0 ? _a : bot_messages_1.default.error);
    });
}
function processTextToEmbedding(bot, message, openAI) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = message.chat.id;
        const fullMessage = message.text;
        const user = (0, prepareUserInfo_1.default)(message);
        bot.sendChatAction(chatId, "typing");
        const prompt = (0, getPrompt_1.default)(bot_actions_1.default.embedding.text, fullMessage);
        const query = yield services_1.QueryService.addQuery({ user_id: user.inner_id, message: prompt, type: "question" });
        if (!query) {
            return yield bot.sendMessage(chatId, bot_messages_1.default.exceedLimit);
        }
        const response = yield (0, getEmbedding_1.default)(prompt, openAI);
        yield bot.sendMessage(chatId, bot_messages_1.default.welcome, { parse_mode: "Markdown" });
    });
}
exports.default = message;
