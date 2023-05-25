import { OpenAIApi } from "openai";

async function getImage(prompt: string, openai: OpenAIApi) {
  try {
    const completion = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
    });

    const imageURL = completion?.data?.data?.[0].url as string;

    return imageURL;
  } catch (error) {
    console.log(error);
  }
}

export default getImage;
