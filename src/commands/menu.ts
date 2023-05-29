import TelegramApi from "node-telegram-bot-api";

import { mainMenu } from "../config/bot_menu";
import messages from "../config/bot_messages";
import { ERROR_STICKER_ID } from "../config/bot_constants";

const menu = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  try {
    bot.sendChatAction(chatId, "typing");
    await bot.sendMessage(chatId, messages.menu, mainMenu);
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default menu;
