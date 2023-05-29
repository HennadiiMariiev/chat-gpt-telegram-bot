import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import { ERROR_STICKER_ID } from "../config/bot_constants";

const request_clear = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  try {
    bot.sendChatAction(chatId, "typing");

    const messageText = "Are you sure?";
    const keyboard = {
      inline_keyboard: [
        [{ text: "✅ Yes", callback_data: "accept_clear" }],
        [{ text: "❌ No", callback_data: "decline_clear" }],
      ],
    };

    bot.sendMessage(chatId, messageText, { reply_markup: keyboard });
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default request_clear;
