"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prepareHistory = (queries) => {
    let str = "<b>Your history:</b>\n";
    if (!queries.length) {
        return "Your history is empty 😭\nPlease, ask me about something 🙏🏻";
    }
    for (let i = 0; i < queries.length; i += 1) {
        const sign = queries[i].type === "question" ? "\n       (❔): " : "\n       (🖼): ";
        const dateStr = "<i> ☑️ " + new Date(queries[i].createdAt).toLocaleString() + "</i>";
        str += dateStr + sign + queries[i].text + "\n";
    }
    return str;
};
exports.default = prepareHistory;
