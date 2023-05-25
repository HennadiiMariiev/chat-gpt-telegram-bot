"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const openai_1 = require("openai");
const connect_1 = require("./db/connect");
const config_1 = require("./config/config");
const bot_menu_1 = require("./config/bot_menu");
const bot_actions_1 = __importDefault(require("./config/bot_actions"));
const ask_1 = __importDefault(require("./commands/ask"));
const start_1 = __importDefault(require("./commands/start"));
const menu_1 = __importDefault(require("./commands/menu"));
const history_1 = __importDefault(require("./commands/history"));
const magic_1 = __importDefault(require("./commands/magic"));
const message_1 = __importDefault(require("./commands/message"));
const limit_1 = __importDefault(require("./commands/limit"));
const audio_1 = __importDefault(require("./commands/audio"));
const info_1 = __importDefault(require("./commands/info"));
const configuration = new openai_1.Configuration(config_1.BOT_CONFIG);
const openAI = new openai_1.OpenAIApi(configuration);
const bot = new node_telegram_bot_api_1.default(config_1.BOT_TOKEN, { polling: true });
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDatabase)();
    }
    catch (e) {
        console.log("Failed to start db connection with error: ", e);
    }
});
startDB();
bot.setMyCommands(bot_menu_1.buttonMenu);
// Commands
bot.onText(/\/start/, (0, start_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.menu.action), (0, menu_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.menu.text), (0, menu_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.ask.action), (0, ask_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.ask.text), (0, ask_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.limit.action), (0, limit_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.limit.text), (0, limit_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.history.action), (0, history_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.history.text), (0, history_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.info.action), (0, info_1.default)(bot));
bot.onText(new RegExp(bot_actions_1.default.info.text), (0, info_1.default)(bot));
// Bonus command
bot.onText(new RegExp(bot_actions_1.default.magic.action), (0, magic_1.default)(bot));
// Handlers
bot.on("voice", (0, audio_1.default)(bot, openAI));
bot.on("message", (0, message_1.default)(bot, openAI));
process.on("SIGINT", connect_1.closeDbConnection);
