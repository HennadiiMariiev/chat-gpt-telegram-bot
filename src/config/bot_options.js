"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuOptions = void 0;
exports.menuOptions = {
    reply_markup: {
        inline_keyboard: [
            [{ callback_data: "/menu", text: "#️⃣ Menu" }],
            [
                { callback_data: "/ask", text: "❔ Ask ChatGPT", switch_inline_query_current_chat: ", please, tell me: " },
                { callback_data: "/image", text: "🖼 Generate Image" },
            ],
            [
                { callback_data: "/history", text: "📄 Chat History" },
                { callback_data: "/info", text: "ℹ️ Info" },
            ],
        ],
    },
    parse_mode: "HTML",
};
