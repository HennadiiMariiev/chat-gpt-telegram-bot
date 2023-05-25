import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";

const info = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  bot.sendChatAction(chatId, "typing");
  await bot.sendMessage(chatId, messages.info, { parse_mode: "HTML" });
};

export default info;
