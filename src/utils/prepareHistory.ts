import { ObjectId } from "mongoose";

const MAX_STR_LENGTH = 4096;
export interface IQuery {
  _id: ObjectId;
  text: string;
  type: string;
  createdAt: Date;
}

const prepareHistory = (queries: IQuery[]) => {
  let str = "<b>Your history:</b>\n";

  if (!queries.length) {
    return "Your history is empty 😭\nPlease, ask me about something 🙏🏻";
  }

  for (let i = 0; i < queries.length; i += 1) {
    const sign = queries[i].type === "question" ? "\n       (❔): " : "\n       (🖼): ";
    const dateStr = "<i> ☑️ " + new Date(queries[i].createdAt).toLocaleString() + "</i>";
    str += dateStr + sign + queries[i].text + "\n";
  }

  if (str.length < MAX_STR_LENGTH) {
    return str;
  }

  return str?.slice(0, MAX_STR_LENGTH - 5) + "...";
};

export default prepareHistory;
