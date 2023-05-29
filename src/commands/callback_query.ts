import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import clear from "./clear";

const callback_query = async (query: TelegramApi.CallbackQuery, bot: TelegramApi) => {
  const chatId = query?.message?.chat.id;
  const from = query?.from;

  const messageId = query?.message?.message_id;
  const buttonClicked = query.data;

  switch (buttonClicked) {
    case "accept_clear":
      await clear(bot, chatId!, from!);
      bot.deleteMessage(chatId!, Number(messageId));
      break;
    case "decline_clear":
      bot.editMessageText("You clicked ❌ No", { chat_id: chatId, message_id: Number(messageId) });
      break;
    default:
      bot.sendMessage(chatId!, messages.invalid_button);
      break;
  }
};

export default callback_query;
