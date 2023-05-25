"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const querySchema = new mongoose_1.Schema({
    text: {
        type: String,
    },
    type: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, { versionKey: false, timestamps: true });
const Query = (0, mongoose_1.model)("query", querySchema);
exports.default = Query;
