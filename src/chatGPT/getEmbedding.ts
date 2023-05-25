import { OpenAIApi } from "openai";

async function getEmbedding(prompt: string, openAI: OpenAIApi) {
  try {
    const response = await openAI.createEmbedding({
      model: "text-embedding-ada-002",
      input: prompt,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default getEmbedding;
