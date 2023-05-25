const getPrompt = (action: string, fullMessage: string) => {
  if (!fullMessage.includes(action)) {
    return fullMessage;
  }
  const idx = fullMessage?.indexOf(action) + action.length + "\n".length;
  return fullMessage?.slice(idx);
};

export default getPrompt;
