import TelegramApi from "node-telegram-bot-api";

import messages from "../config/bot_messages";
import { QueryService } from "../db/services";
import prepareHistory, { IQuery } from "../utils/prepareHistory";
import prepareUserInfo from "../utils/prepareUserInfo";

const history = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  const user = prepareUserInfo(message);
  bot.sendChatAction(chatId, "typing");

  const queries = await QueryService.getUserQueries({ id: user.inner_id });

  if (!queries) {
    return await bot.sendMessage(chatId, messages.error);
  }

  const reply = prepareHistory(queries as unknown as IQuery[]);

  await bot.sendMessage(chatId, reply, { parse_mode: "HTML" });
};

export default history;
