import TelegramApi from "node-telegram-bot-api";

const prepareUserInfo = (message: TelegramApi.Message) => {
  return {
    inner_id: message.from?.id?.toString() as string,
    first_name: message.from?.first_name as string,
    username: message.from?.username as string,
    is_bot: message.from?.is_bot as boolean,
  };
};

const prepareFromQueryInfo = (from: TelegramApi.User) => {
  return {
    inner_id: from?.id?.toString() as string,
    first_name: from?.first_name as string,
    username: from?.username as string,
    is_bot: from?.is_bot as boolean,
  };
};

export { prepareUserInfo, prepareFromQueryInfo };
