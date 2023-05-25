"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
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
        text: config_1.BOT_MAGIC_SECRET !== null && config_1.BOT_MAGIC_SECRET !== void 0 ? config_1.BOT_MAGIC_SECRET : "restore_limit",
        action: config_1.BOT_MAGIC_SECRET ? "/" + config_1.BOT_MAGIC_SECRET : "/restore_limit",
    },
};
exports.default = actions;
