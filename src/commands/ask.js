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
Object.defineProperty(exports, "__esModule", { value: true });
const ask = (bot) => (message) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = message.chat.id;
    bot.sendChatAction(chatId, "typing");
    yield bot.sendMessage(chatId, "Please, choose an action \u{1F447}", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "❔ Ask Question", switch_inline_query_current_chat: ", Question:\n" }],
                [{ text: "🖼 Generate Image", switch_inline_query_current_chat: ", Image:\n" }],
                [{ text: "✏️ Text To Embedding", switch_inline_query_current_chat: ", Embedding:\n" }],
                // [{ text: "🗣 Text To Speech", switch_inline_query_current_chat: ", Text:\n" }],
            ],
        },
    });
});
exports.default = ask;
