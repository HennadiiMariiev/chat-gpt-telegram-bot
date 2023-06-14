import { User, Query } from "../schemas/";

interface IQuery {
  user_id: string;
  message: string;
  type: "question" | "image";
}

const addQuery = async ({ user_id, message, type }: IQuery) => {
  try {
    const user = await User.findOneAndUpdate({ inner_id: user_id, limit: { $gt: 0 } }, { $inc: { limit: -1 } });

    if (!user) {
      return null;
    }

    const newQuery = new Query({ text: message, user: user._id, type });

    return await newQuery.save();
  } catch (error) {
    return error;
  }
};

const getUserQueries = async ({ id }: { id: string }) => {
  try {
    const user = await User.findOne({ inner_id: id });
    if (!user) {
      return null;
    }

    const queries = await Query.find({ user: user._id });

    if (!queries) {
      return [];
    }

    return queries;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const deleteUserQueries = async ({ id }: { id: string }) => {
  try {
    const user = await User.findOne({ inner_id: id });
    if (!user) {
      return null;
    }

    await Query.deleteMany({ user: user._id });

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false, error };
  }
};

export { addQuery, getUserQueries, deleteUserQueries };
