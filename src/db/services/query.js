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
exports.getUserQueries = exports.addQuery = void 0;
const schemas_1 = require("../schemas/");
const addQuery = ({ user_id, message, type }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield schemas_1.User.findOneAndUpdate({ inner_id: user_id, limit: { $gt: 0 } }, { $inc: { limit: -1 } });
        if (!user) {
            return null;
        }
        const newQuery = new schemas_1.Query({ text: message, user: user._id, type });
        return yield newQuery.save();
    }
    catch (error) {
        return error;
    }
});
exports.addQuery = addQuery;
const getUserQueries = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield schemas_1.User.findOne({ inner_id: id });
        if (!user) {
            return null;
        }
        const queries = yield schemas_1.Query.find({ user: user._id });
        if (!queries) {
            return [];
        }
        return queries;
    }
    catch (error) {
        console.log(error);
        return [];
    }
});
exports.getUserQueries = getUserQueries;
