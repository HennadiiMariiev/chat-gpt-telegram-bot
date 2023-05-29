import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import { QueryService } from "../db/services";
import { prepareFromQueryInfo } from "../utils/prepareUserInfo";
import { ERROR_STICKER_ID } from "../config/bot_constants";

const clear = async (bot: TelegramApi, chatId: number, from: TelegramApi.User) => {
  try {
    const user = prepareFromQueryInfo(from);
    bot.sendChatAction(chatId, "typing");

    const res = await QueryService.deleteUserQueries({ id: user.inner_id });

    if (!res?.success) {
      return await bot.sendMessage(chatId, messages.error);
    }
    await bot.sendMessage(chatId, messages.clear, { parse_mode: "HTML" });
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default clear;
