import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import { ERROR_STICKER_ID, NOT_CLEAR_STICKER_ID } from "../config/bot_constants";

const audio = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  try {
    await bot.sendAnimation(chatId, NOT_CLEAR_STICKER_ID);
    await bot.sendMessage(chatId, messages.audio);
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default audio;
