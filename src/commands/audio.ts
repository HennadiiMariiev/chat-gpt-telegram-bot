import TelegramApi from "node-telegram-bot-api";

import replyMessages from "../config/bot_messages";

const audio = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  await bot.sendMessage(chatId, replyMessages.audio);
};

export default audio;
