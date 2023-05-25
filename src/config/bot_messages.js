"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const messages = {
    welcome: "👋🏻 <b>Welcome to ChatGPT bot!</b>",
    menu: "👇🏻 Please, choose what you need",
    exceedLimit: "😞 Your limit has been reached.",
    error: "😥 Something went wrong...\n🙏🏻 Please, try again later!",
    magic: "✨✨✨ Yes, master! ✨✨✨",
    short_message: `😎 Please, provide your message (min ${config_1.MIN_MESSAGE_LENGTH} symbols)`,
    audio: "🤓 I don't know how to deal with voice and audio messages",
    info: "<b>Information 📰</b>\n\nThis is very simple ChatGPT Telegram bot 🤖." +
        "\nJust ask him something, and he will try to response with OpenAI 😎." +
        "\n\n<u>You can:</u>\n✅ ask a question\n✅ request to generate image by short explanation." +
        "\n\nThis bot was developed with <a href='https://nodejs.org/'>Node.js</a> and <a href='https://www.npmjs.com/package/node-telegram-bot-api'>node-telegram-bot-api</a>." +
        "\n\nThanks for using it!🙏🏻",
};
exports.default = messages;
