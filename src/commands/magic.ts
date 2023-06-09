import TelegramApi from "node-telegram-bot-api";

import { UserService } from "../db/services";
import { ERROR_STICKER_ID, MAGIC_STICKER_ID } from "../config/bot_constants";
import { prepareUserInfo } from "../utils/prepareUserInfo";
import messages from "../config/bot_messages";

const refreshUserLimit = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;

  try {
    const user = prepareUserInfo(message);

    bot.sendChatAction(chatId, "typing");

    const limit = await UserService.refreshLimit({ inner_id: user.inner_id });

    if (!limit) {
      await bot.sendMessage(chatId, messages.error);
    }

    await bot.sendAnimation(chatId, MAGIC_STICKER_ID);
    await bot.sendMessage(chatId, messages.magic, { parse_mode: "HTML" });
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default refreshUserLimit;
