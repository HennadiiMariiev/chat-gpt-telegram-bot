import TelegramApi from "node-telegram-bot-api";
import { OpenAIApi } from "openai";
import path from "path";

import replyMessages from "../config/bot_messages";
import getImage from "../chatGPT/getImage";
import getChatResponse from "../chatGPT/getResponse";
import actions from "../config/bot_actions";
import { QueryService } from "../db/services";
import prepareUserInfo from "../utils/prepareUserInfo";
import getPrompt from "../utils/getPrompt";
import getEmbedding from "../chatGPT/getEmbedding";
import getSpeech from "../chatGPT/getSpeech";

const audio = (bot: TelegramApi, openAI: OpenAIApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;
  await bot.sendMessage(chatId, replyMessages.audio);
  // await processSpeechToTextQuery(bot, message, openAI);
};

async function processSpeechToTextQuery(bot: TelegramApi, message: TelegramApi.Message, openAI: OpenAIApi) {
  const chatId = message.chat.id;
  const voiceMessageId = message?.voice?.file_id;
  const user = prepareUserInfo(message);

  console.log("message", message);

  bot.sendChatAction(chatId, "typing");
  const query = await QueryService.addQuery({ user_id: user.inner_id!, message: "audio", type: "question" });

  if (!query) {
    return await bot.sendMessage(chatId, replyMessages.exceedLimit);
  }

  //   const response = await getSpeech(fullMessage!, openAI);
  if (!voiceMessageId) {
    console.log("voiceMessageId", voiceMessageId);

    await bot.sendMessage(chatId, replyMessages.welcome, { parse_mode: "Markdown" });
  }

  try {
    // Get the voice message file from Telegram's servers
    const file = await bot.getFile(voiceMessageId!);

    // Download the voice message file as a buffer
    const buffer = await bot.downloadFile(file.file_path!, path.resolve(__dirname));

    // Convert the buffer to a base64-encoded string
    const audio = `data:${file.file_path!.split(".").pop()};base64,${buffer.toString()}`;

    // const transcription = await openAI.createTranscription(file as any, "whisper-1");

    // console.log("transcription", transcription);

    await bot.sendMessage(chatId, replyMessages.welcome, { parse_mode: "Markdown" });
  } catch (error) {
    console.log(error);
  }
}

export default audio;
