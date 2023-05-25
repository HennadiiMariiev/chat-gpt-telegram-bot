import { REQUEST_LIMIT } from "../../config/config";
import User from "../schemas/user";

interface IUser {
  inner_id: string;
  first_name: string;
  username: string;
  is_bot: boolean;
}

const addNewUser = async ({ inner_id, first_name, username, is_bot }: IUser) => {
  try {
    const user = await User.findOne({ inner_id: inner_id.toString() });

    if (user) {
      return user;
    }

    const newUser = new User({ inner_id, first_name, username, is_bot, last_message: "/start" });

    return await newUser.save();
  } catch (error) {
    return error;
  }
};

const getLimit = async ({ inner_id }: { inner_id: string }) => {
  try {
    const user = await User.findOne({ inner_id });

    if (!user) {
      return null;
    }

    return user.limit;
  } catch (error) {
    return error;
  }
};

const decrementLimit = async ({ inner_id }: { inner_id: string }) => {
  try {
    const user = await User.findOneAndUpdate({ inner_id, limit: { $gt: 0 } }, { $inc: { limit: -1 } });

    if (!user) {
      return null;
    }

    return user.limit;
  } catch (error) {
    return error;
  }
};

const refreshLimit = async ({ inner_id }: { inner_id: string }) => {
  try {
    const user = await User.findOneAndUpdate({ inner_id }, { limit: REQUEST_LIMIT });

    if (!user) {
      return null;
    }

    return user.limit;
  } catch (error) {
    return error;
  }
};

export { addNewUser, getLimit, decrementLimit, refreshLimit };
