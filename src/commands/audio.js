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
const path_1 = __importDefault(require("path"));
const bot_messages_1 = __importDefault(require("../config/bot_messages"));
const services_1 = require("../db/services");
const prepareUserInfo_1 = __importDefault(require("../utils/prepareUserInfo"));
const audio = (bot, openAI) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    yield bot.sendMessage(chatId, bot_messages_1.default.audio);
    // await processSpeechToTextQuery(bot, message, openAI);
});
function processSpeechToTextQuery(bot, message, openAI) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = message.chat.id;
        const voiceMessageId = (_a = message === null || message === void 0 ? void 0 : message.voice) === null || _a === void 0 ? void 0 : _a.file_id;
        const user = (0, prepareUserInfo_1.default)(message);
        console.log("message", message);
        bot.sendChatAction(chatId, "typing");
        const query = yield services_1.QueryService.addQuery({ user_id: user.inner_id, message: "audio", type: "question" });
        if (!query) {
            return yield bot.sendMessage(chatId, bot_messages_1.default.exceedLimit);
        }
        //   const response = await getSpeech(fullMessage!, openAI);
        if (!voiceMessageId) {
            console.log("voiceMessageId", voiceMessageId);
            yield bot.sendMessage(chatId, bot_messages_1.default.welcome, { parse_mode: "Markdown" });
        }
        try {
            // Get the voice message file from Telegram's servers
            const file = yield bot.getFile(voiceMessageId);
            // Download the voice message file as a buffer
            const buffer = yield bot.downloadFile(file.file_path, path_1.default.resolve(__dirname));
            // Convert the buffer to a base64-encoded string
            const audio = `data:${file.file_path.split(".").pop()};base64,${buffer.toString()}`;
            // const transcription = await openAI.createTranscription(file as any, "whisper-1");
            // console.log("transcription", transcription);
            yield bot.sendMessage(chatId, bot_messages_1.default.welcome, { parse_mode: "Markdown" });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = audio;
