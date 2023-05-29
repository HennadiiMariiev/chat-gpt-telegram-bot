import TelegramApi from "node-telegram-bot-api";
import { Configuration, OpenAIApi } from "openai";

import { connectDatabase, closeDbConnection } from "./db/connect";
import { BOT_TOKEN, BOT_CONFIG } from "./config/config";
import { buttonMenu } from "./config/bot_menu";
import actions from "./config/bot_actions";
import ask from "./commands/ask";
import start from "./commands/start";
import menu from "./commands/menu";
import history from "./commands/history";
import refreshUserLimit from "./commands/magic";
import message from "./commands/message";
import limit from "./commands/limit";
import audio from "./commands/audio";
import info from "./commands/info";
import request_clear from "./commands/request_clear";
import callback_query from "./commands/callback_query";

const configuration = new Configuration(BOT_CONFIG);

const openAI = new OpenAIApi(configuration);
const bot = new TelegramApi(BOT_TOKEN as string, { polling: true });

const startDB = async () => {
  try {
    await connectDatabase();
  } catch (e) {
    console.log("Failed to start db connection with error: ", e);
  }
};

startDB();
bot.setMyCommands(buttonMenu);

// Commands
bot.onText(/\/start/, start(bot));
bot.onText(new RegExp(actions.menu.action), menu(bot));
bot.onText(new RegExp(actions.menu.text), menu(bot));
bot.onText(new RegExp(actions.ask.action), ask(bot));
bot.onText(new RegExp(actions.ask.text), ask(bot));
bot.onText(new RegExp(actions.limit.action), limit(bot));
bot.onText(new RegExp(actions.limit.text), limit(bot));
bot.onText(new RegExp(actions.history.action), history(bot));
bot.onText(new RegExp(actions.history.text), history(bot));
bot.onText(new RegExp(actions.clear.action), request_clear(bot));
bot.onText(new RegExp(actions.clear.text), request_clear(bot));
bot.onText(new RegExp(actions.info.action), info(bot));
bot.onText(new RegExp(actions.info.text), info(bot));

// Bonus command
bot.onText(new RegExp(actions.magic.action), refreshUserLimit(bot));

// Handlers
bot.on("voice", audio(bot));
bot.on("message", message(bot, openAI));
bot.on("callback_query", (query) => callback_query(query, bot));

process.on("SIGINT", closeDbConnection);
