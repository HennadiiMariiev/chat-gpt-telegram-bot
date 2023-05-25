"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHelper = void 0;
const responseHelper = (text) => {
    let tempStr = text;
    if (typeof text === "string" && (text === null || text === void 0 ? void 0 : text.includes("```\n"))) {
        while (tempStr === null || tempStr === void 0 ? void 0 : tempStr.includes("```\n")) {
            let firstCodeIdx = tempStr.indexOf("```\n");
            if (firstCodeIdx > -1) {
                tempStr = tempStr.replace("```\n", "``` ");
            }
            let nextCodeIdx = tempStr.indexOf("```\n");
            if (nextCodeIdx > -1) {
                tempStr = tempStr.replace("```\n", "``` ");
            }
        }
    }
    return tempStr;
};
exports.responseHelper = responseHelper;
