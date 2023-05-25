import TelegramBot from "node-telegram-bot-api";
import { OpenAIApi } from "openai";

async function getSpeech(file: TelegramBot.Audio, openAI: OpenAIApi) {
  try {
    const resp = await openAI.createTranscription(file as any, "whisper-1");

    console.log("getSpeech", resp);

    return resp;
  } catch (error) {
    console.log(error);
  }
}

export default getSpeech;
