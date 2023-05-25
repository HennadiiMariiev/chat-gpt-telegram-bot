import TelegramApi from "node-telegram-bot-api";

import { mainMenu } from "../config/bot_menu";
import messages from "../config/bot_messages";

const menu = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;

  bot.sendChatAction(chatId, "typing");
  await bot.sendMessage(chatId, messages.menu, mainMenu);
};

export default menu;
