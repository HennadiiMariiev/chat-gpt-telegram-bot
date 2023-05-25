import TelegramApi from "node-telegram-bot-api";
import { UserService } from "../db/services";

import { mainMenu } from "../config/bot_menu";
import prepareUserInfo from "../utils/prepareUserInfo";
import messages from "../config/bot_messages";
import { OWNER_ID } from "../config/config";

const start = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  const user = prepareUserInfo(message);
  const userInfo = user.username ? user.first_name + " " + user.username : user.first_name;
  const msgToOwner = `<b>😎 New user</b>\n\t👤 ${userInfo}\n\t🤖 isBot: ${
    user.is_bot ? "yes 👎🏻" : "no 👍🏻"
  }\nhas just started 🔥`;

  bot.sendChatAction(chatId, "typing");

  await UserService.addNewUser(user);
  await bot.sendMessage(OWNER_ID!, msgToOwner, {
    parse_mode: "HTML",
  });
  await bot.sendMessage(chatId, messages.welcome, mainMenu);
};

export default start;
