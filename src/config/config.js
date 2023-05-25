"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_LIMIT = exports.MIN_MESSAGE_LENGTH = exports.BOT_CONFIG = exports.BOT_NAME = exports.DB_URL = exports.DB_NAME = exports.OWNER_ID = exports.BOT_TOKEN = exports.BOT_MAGIC_SECRET = exports.OPENAI_MODEL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BOT_NAME, BOT_TOKEN, BOT_MAGIC_SECRET, OPEN_AI_ORG_KEY, OPENAI_API_KEY, DB_NAME, DB_URL, OWNER_ID } = process.env;
exports.BOT_NAME = BOT_NAME;
exports.BOT_TOKEN = BOT_TOKEN;
exports.BOT_MAGIC_SECRET = BOT_MAGIC_SECRET;
exports.DB_NAME = DB_NAME;
exports.DB_URL = DB_URL;
exports.OWNER_ID = OWNER_ID;
const OPENAI_MODEL = "gpt-3.5-turbo";
exports.OPENAI_MODEL = OPENAI_MODEL;
const MIN_MESSAGE_LENGTH = 7;
exports.MIN_MESSAGE_LENGTH = MIN_MESSAGE_LENGTH;
const REQUEST_LIMIT = 10;
exports.REQUEST_LIMIT = REQUEST_LIMIT;
const BOT_CONFIG = {
    organization: OPEN_AI_ORG_KEY,
    apiKey: OPENAI_API_KEY,
};
exports.BOT_CONFIG = BOT_CONFIG;
