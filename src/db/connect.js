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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDbConnection = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // return MODE === 'dev'
    //   ? await mongoose.connect(DB_LOCAL_CONTAINER, { dbName: 'db-rss-posts', socketTimeoutMS: 60 * 1000 })
    // : await mongoose.connect(DB_URL, { dbName: DB_NAME, socketTimeoutMS: 60 * 1000 });
    yield mongoose_1.default.connect(config_1.DB_URL, { dbName: config_1.DB_NAME, socketTimeoutMS: 60 * 1000 });
});
exports.connectDatabase = connectDatabase;
const closeDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield mongoose_1.default.connection.close(true);
    console.log("closeDbConnection", res);
    console.log("DB disconnected on app termination");
});
exports.closeDbConnection = closeDbConnection;
