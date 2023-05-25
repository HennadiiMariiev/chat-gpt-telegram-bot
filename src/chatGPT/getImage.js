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
function getImage(prompt, openai) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const completion = yield openai.createImage({
                prompt,
                n: 1,
                size: "256x256",
            });
            const imageURL = (_b = (_a = completion === null || completion === void 0 ? void 0 : completion.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[0].url;
            return imageURL;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = getImage;
