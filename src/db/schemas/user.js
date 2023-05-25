"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("../../config/config");
const userSchema = new mongoose_1.Schema({
    inner_id: {
        type: String,
        unique: true,
    },
    first_name: {
        type: String,
    },
    username: {
        type: String,
    },
    is_bot: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    last_message: {
        text: {
            default: "",
            type: String,
        },
        date: {
            default: Date.now(),
            type: Date,
        },
    },
    limit: {
        type: Number,
        default: config_1.REQUEST_LIMIT,
    },
}, { versionKey: false, timestamps: true });
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
