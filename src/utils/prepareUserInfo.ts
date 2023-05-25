import TelegramApi from "node-telegram-bot-api";

const prepareUserInfo = (message: TelegramApi.Message) => {
  return {
    inner_id: message.from?.id!?.toString(),
    first_name: message.from?.first_name!,
    username: message.from?.username!,
    is_bot: message.from?.is_bot!,
  };
};

export default prepareUserInfo;
