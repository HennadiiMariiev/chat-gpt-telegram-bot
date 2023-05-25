import TelegramBot from "node-telegram-bot-api";

type cacheType = {
  me: undefined | string;
};

const getMe = (bot: TelegramBot) => {
  try {
    const cache: cacheType = { me: undefined };

    return async () => {
      if (!cache.me) {
        const me = await bot.getMe();

        console.log("getMe", me);
        cache.me = me?.username as string;
      }
      return cache.me;
    };
  } catch (error) {
    console.log("getMe.ts:8 ", error);
    return null;
  }
};

export default getMe;
