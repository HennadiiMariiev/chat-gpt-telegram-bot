import { SendMessageOptions } from "node-telegram-bot-api";

const menuOptions: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ callback_data: "/menu", text: "#️⃣ Menu" }],
      [
        { callback_data: "/ask", text: "❔ Ask ChatGPT", switch_inline_query_current_chat: "/question" },
        { callback_data: "/image", text: "🖼 Generate Image" },
      ],
      [
        { callback_data: "/history", text: "📄 Chat History" },
        { callback_data: "/clear", text: "🧹 Clear Chat History" },
      ],
      [{ callback_data: "/info", text: "ℹ️ Info" }],
    ],
  },
  parse_mode: "HTML",
};

const mainMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "#️⃣ Menu" }],
      [{ text: "❔ Ask ChatGPT" }, { text: "📄 Chat History" }],
      [{ text: "🤌🏻 Limit" }, { text: "ℹ️ Info" }],
    ],
  },
  parse_mode: "HTML",
};

const buttonMenu = [
  { command: "/menu", description: "#️⃣ Menu" },
  { command: "/ask", description: "❔ Ask ChatGPT" },
  { command: "/history", description: "📄 Chat History" },
  { command: "/clear", description: "🧹 Clear Chat History" },
  { command: "/info", description: "ℹ️ Info" },
  { command: "/limit", description: "🤌🏻 AI requests limit" },
];

export { mainMenu, buttonMenu, menuOptions };
