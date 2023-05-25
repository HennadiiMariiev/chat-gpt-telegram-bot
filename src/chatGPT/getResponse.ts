import { OpenAIApi } from "openai";

import { OPENAI_MODEL } from "../config/config";

async function getChatResponse(prompt: string, openai: OpenAIApi) {
  try {
    const completion = await openai.createChatCompletion({
      model: OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 1000,
    });

    const reply = completion?.data?.choices?.[0].message?.content as string;

    return reply;
  } catch (error) {
    console.log(error);
  }
}

export default getChatResponse;
