import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import { QueryService } from "../db/services";
import prepareHistory, { IQuery } from "../utils/prepareHistory";
import { prepareUserInfo } from "../utils/prepareUserInfo";
import { ERROR_STICKER_ID } from "../config/bot_constants";

const history = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  try {
    const user = prepareUserInfo(message);
    bot.sendChatAction(chatId, "typing");

    const queries = await QueryService.getUserQueries({ id: user.inner_id });

    if (!queries) {
      return await bot.sendMessage(chatId, messages.error);
    }

    const reply = prepareHistory(queries as unknown as IQuery[]);

    if (Array.isArray(reply)) {
      for (let i = 0; i < reply.length; i += 1) {
        await bot.sendMessage(chatId, reply[i], { parse_mode: "HTML" });
      }
    }

    if (typeof reply === "string") {
      await bot.sendMessage(chatId, reply, { parse_mode: "HTML" });
    }
  } catch (error) {
    await bot.sendAnimation(chatId, ERROR_STICKER_ID);
    await bot.sendMessage(chatId, messages.error, { parse_mode: "HTML" });
  }
};

export default history;
