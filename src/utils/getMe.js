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
const getMe = (bot) => {
    try {
        const cache = { me: undefined };
        return () => __awaiter(void 0, void 0, void 0, function* () {
            if (!cache.me) {
                const me = yield bot.getMe();
                console.log("getMe", me);
                cache.me = me === null || me === void 0 ? void 0 : me.username;
            }
            return cache.me;
        });
    }
    catch (error) {
        console.log("getMe.ts:8 ", error);
        return null;
    }
};
exports.default = getMe;
