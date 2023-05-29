import TelegramApi from "node-telegram-bot-api";

import { UserService } from "../db/services";
import { prepareUserInfo } from "../utils/prepareUserInfo";
import { ERROR_STICKER_ID } from "../config/bot_constants";
import messages from "../config/bot_messages";

const limit = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  try {
    const user = prepareUserInfo(message);

    const limit = await UserService.getLimit({ inner_id: user.inner_id });

    bot.sendChatAction(chatId, "typing");
    await bot.sendMessage(chatId, "<b>Your limit:</b>\n" + limit + " requests left", { parse_mode: "HTML" });
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default limit;
