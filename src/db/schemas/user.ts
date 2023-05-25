import { Schema, model } from "mongoose";
import { REQUEST_LIMIT } from "../../config/config";

const userSchema = new Schema(
  {
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
      default: REQUEST_LIMIT,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default User;
