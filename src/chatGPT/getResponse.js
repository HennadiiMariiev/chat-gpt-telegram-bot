"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
function getChatResponse(prompt, openai) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const completion = yield openai.createChatCompletion({
                model: config_1.OPENAI_MODEL,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.2,
                max_tokens: 1000,
            });
            const reply = (_c = (_b = (_a = completion === null || completion === void 0 ? void 0 : completion.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b[0].message) === null || _c === void 0 ? void 0 : _c.content;
            return reply;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = getChatResponse;
