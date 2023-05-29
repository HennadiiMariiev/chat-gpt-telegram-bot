import TelegramApi from "node-telegram-bot-api";

import { UserService } from "../db/services";
import { prepareUserInfo } from "../utils/prepareUserInfo";

const limit = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  const user = prepareUserInfo(message);

  const limit = await UserService.getLimit({ inner_id: user.inner_id });

  bot.sendChatAction(chatId, "typing");
  await bot.sendMessage(chatId, "<b>Your limit:</b>\n" + limit + " requests left", { parse_mode: "HTML" });
};

export default limit;
