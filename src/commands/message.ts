import TelegramApi from "node-telegram-bot-api";
import { OpenAIApi } from "openai";

import getImage from "../chatGPT/getImage";
import getChatResponse from "../chatGPT/getResponse";
import actions from "../config/bot_actions";
import replyMessages from "../config/bot_messages";
import { QueryService } from "../db/services";
import prepareUserInfo from "../utils/prepareUserInfo";
import getPrompt from "../utils/getPrompt";
import getEmbedding from "../chatGPT/getEmbedding";
import getTextAndActionValues from "../utils/getTextAndActionValues";
import { MIN_MESSAGE_LENGTH } from "../config/config";

const menuValues = getTextAndActionValues();

const message = (bot: TelegramApi, openAI: OpenAIApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  const txt = message.text;

  try {
    if (txt && menuValues.includes(txt!)) {
      return;
    }
    if (txt?.includes(actions.question.text)) {
      return await processTextQuery(bot, message, openAI);
    }
    if (txt?.includes(actions.image.text)) {
      return await processImageQuery(bot, message, openAI);
    }
    if (txt?.includes(actions.embedding.text)) {
      return await processTextToEmbedding(bot, message, openAI);
    }
    if (txt && txt.trim().length! >= MIN_MESSAGE_LENGTH) {
      return await processTextQuery(bot, message, openAI, true);
    }
    if (message?.voice) {
      return await bot.sendMessage(chatId, replyMessages.audio, { parse_mode: "Markdown" });
    }

    bot.sendChatAction(chatId, "typing");
    await bot.sendMessage(chatId, replyMessages.short_message, { parse_mode: "Markdown" });
  } catch (error) {
    await bot.sendMessage(chatId, replyMessages.error, { parse_mode: "Markdown" });
  }
};

async function processTextQuery(
  bot: TelegramApi,
  message: TelegramApi.Message,
  openAI: OpenAIApi,
  isFullMessage?: boolean
) {
  const chatId = message.chat.id;
  const fullMessage = message.text;
  const user = prepareUserInfo(message);

  bot.sendChatAction(chatId, "typing");
  const prompt = getPrompt(actions.question.text, fullMessage!);
  const query = await QueryService.addQuery({ user_id: user.inner_id!, message: prompt, type: "question" });

  if (!query) {
    return await bot.sendMessage(chatId, replyMessages.exceedLimit);
  }

  const messageStr = isFullMessage ? fullMessage : prompt;
  const response = await getChatResponse(messageStr!, openAI);

  await bot.sendMessage(chatId, (response as string) ?? replyMessages.error, { parse_mode: "Markdown" });
}

async function processImageQuery(bot: TelegramApi, message: TelegramApi.Message, openAI: OpenAIApi) {
  const chatId = message.chat.id;
  const fullMessage = message.text;
  const user = prepareUserInfo(message);

  bot.sendChatAction(chatId, "upload_photo");
  const prompt = getPrompt(actions.image.text, fullMessage!);
  const query = await QueryService.addQuery({ user_id: user.inner_id!, message: prompt, type: "image" });

  if (!query) {
    return await bot.sendMessage(chatId, replyMessages.exceedLimit);
  }

  const response = await getImage(prompt, openAI);

  await bot.sendMessage(chatId, (response as string) ?? replyMessages.error);
}

async function processTextToEmbedding(bot: TelegramApi, message: TelegramApi.Message, openAI: OpenAIApi) {
  const chatId = message.chat.id;
  const fullMessage = message.text;
  const user = prepareUserInfo(message);

  bot.sendChatAction(chatId, "typing");
  const prompt = getPrompt(actions.embedding.text, fullMessage!);
  const query = await QueryService.addQuery({ user_id: user.inner_id!, message: prompt, type: "question" });

  if (!query) {
    return await bot.sendMessage(chatId, replyMessages.exceedLimit);
  }

  const response = await getEmbedding(prompt!, openAI);

  await bot.sendMessage(chatId, replyMessages.welcome, { parse_mode: "Markdown" });
}

export default message;
