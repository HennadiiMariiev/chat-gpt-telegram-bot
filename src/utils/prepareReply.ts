import { MAX_STR_LENGTH } from "../config/bot_constants";

const prepareReply = (chatReplyMessage: string) => {
  const str = chatReplyMessage;

  if (str.length >= MAX_STR_LENGTH) {
    const strArr: string[] = [];

    for (let i = 0; i < str.length; i += MAX_STR_LENGTH) {
      strArr.push(str.slice(i, i + MAX_STR_LENGTH));
    }

    return strArr;
  }

  return str;
};

export default prepareReply;
