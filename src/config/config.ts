import dotenv from "dotenv";

dotenv.config();

const { BOT_NAME, BOT_TOKEN, BOT_MAGIC_SECRET, OPEN_AI_ORG_KEY, OPENAI_API_KEY, DB_NAME, DB_URL, OWNER_ID } =
  process.env;

const OPENAI_MODEL = "gpt-3.5-turbo";
const MIN_MESSAGE_LENGTH = 7;
const REQUEST_LIMIT = 10;

const BOT_CONFIG = {
  organization: OPEN_AI_ORG_KEY,
  apiKey: OPENAI_API_KEY,
};

export {
  OPENAI_MODEL,
  BOT_MAGIC_SECRET,
  BOT_TOKEN,
  OWNER_ID,
  DB_NAME,
  DB_URL,
  BOT_NAME,
  BOT_CONFIG,
  MIN_MESSAGE_LENGTH,
  REQUEST_LIMIT,
};
