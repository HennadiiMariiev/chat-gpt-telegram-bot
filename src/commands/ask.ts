import TelegramApi from "node-telegram-bot-api";

const ask = (bot: TelegramApi) => async (message: TelegramApi.Message) => {
  const chatId = message.chat.id;

  bot.sendChatAction(chatId, "typing");
  await bot.sendMessage(chatId, "Please, choose an action \u{1F447}", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "❔ Ask Question", switch_inline_query_current_chat: ", Question:\n" }],
        [{ text: "🖼 Generate Image", switch_inline_query_current_chat: ", Image:\n" }],
        [{ text: "✏️ Text To Embedding", switch_inline_query_current_chat: ", Embedding:\n" }],
        // [{ text: "🗣 Text To Speech", switch_inline_query_current_chat: ", Text:\n" }],
      ],
    },
  });
};

export default ask;
