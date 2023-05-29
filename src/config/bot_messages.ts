import { MIN_MESSAGE_LENGTH } from "./config";

const messages = {
  welcome: "👋🏻 <b>Welcome to ChatGPT bot!</b>",
  menu: "👇🏻 Please, choose what you need",
  exceedLimit: "😞 Your limit has been reached.",
  error: "😥 Something went wrong...\n🙏🏻 Please, try again later!",
  magic: "🧞‍♂️🧞‍♂️🧞‍♂️ <b>Yes, master!</b> 🧞‍♂️🧞‍♂️🧞‍♂️\n✨✨✨ Your limit has been restored ✨✨✨",
  short_message: `🙏🏻 Please, provide your message (<b>min ${MIN_MESSAGE_LENGTH} symbols</b>)`,
  audio: "🤓 I don't know how to deal with voice and audio messages",
  clear: "🧹🧹🧹 Your history has been cleared 🧹🧹🧹",
  invalid_button: "🤔 Invalid button",
  info:
    "<b>Information 📰</b>\n\nThis is very simple ChatGPT Telegram bot 🤖." +
    "\nJust ask him something, and he will try to response with OpenAI 😎." +
    "\n\n<u>You can:</u>\n✅ ask a question\n✅ request to generate image by short explanation." +
    "\n\nThis bot was developed with <a href='https://nodejs.org/'>Node.js</a> and <a href='https://www.npmjs.com/package/node-telegram-bot-api'>node-telegram-bot-api</a>." +
    "\n\nThanks for using it!🙏🏻",
};

export default messages;
