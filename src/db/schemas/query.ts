import { Schema, model } from "mongoose";

const querySchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Query = model("query", querySchema);

export default Query;
