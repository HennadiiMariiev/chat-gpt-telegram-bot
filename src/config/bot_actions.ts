import { BOT_MAGIC_SECRET } from "./config";

const actions = {
  ask: {
    text: "❔ Ask ChatGPT",
    action: "/ask",
  },
  question: {
    text: "Question:",
    action: "/question",
  },
  image: {
    text: "Image:",
    action: "/image",
  },
  embedding: {
    text: "Embedding:",
    action: "/embedding",
  },
  audio: {
    text: "Audio:",
    action: "/audio",
  },
  history: {
    text: "📄 Chat History",
    action: "/history",
  },
  clear: {
    text: "🧹 Clear Chat History",
    action: "/clear",
  },
  info: {
    text: "ℹ️ Info",
    action: "/info",
  },
  menu: {
    text: "#️⃣ Menu",
    action: "/menu",
  },
  limit: {
    text: "🤌🏻 Limit",
    action: "/limit",
  },
  magic: {
    text: BOT_MAGIC_SECRET ?? "restore_limit",
    action: BOT_MAGIC_SECRET ? "/" + BOT_MAGIC_SECRET : "/restore_limit",
  },
};

export default actions;
