import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import clear from "./clear";
import { ERROR_STICKER_ID } from "../config/bot_constants";

const callback_query = async (query: TelegramApi.CallbackQuery, bot: TelegramApi) => {
  const chatId = query?.message?.chat.id;
  try {
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
  } catch (error) {
    await bot.sendAnimation(chatId!, ERROR_STICKER_ID);
    await bot.sendMessage(chatId!, messages.error, { parse_mode: "HTML" });
  }
};

export default callback_query;
