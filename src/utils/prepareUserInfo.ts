import TelegramApi from "node-telegram-bot-api";

const prepareUserInfo = (message: TelegramApi.Message) => {
  return {
    inner_id: message.from?.id!?.toString(),
    first_name: message.from?.first_name!,
    username: message.from?.username!,
    is_bot: message.from?.is_bot!,
  };
};

const prepareFromQueryInfo = (from: TelegramApi.User) => {
  return {
    inner_id: from?.id!?.toString(),
    first_name: from?.first_name!,
    username: from?.username!,
    is_bot: from?.is_bot!,
  };
};

export { prepareUserInfo, prepareFromQueryInfo };
