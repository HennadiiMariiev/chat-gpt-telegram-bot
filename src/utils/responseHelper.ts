export const responseHelper = (text: string) => {
  let tempStr = text;
  if (typeof text === "string" && text?.includes("```\n")) {
    while (tempStr?.includes("```\n")) {
      const firstCodeIdx = tempStr.indexOf("```\n");
      if (firstCodeIdx > -1) {
        tempStr = tempStr.replace("```\n", "``` ");
      }
      const nextCodeIdx = tempStr.indexOf("```\n");
      if (nextCodeIdx > -1) {
        tempStr = tempStr.replace("```\n", "``` ");
      }
    }
  }
  return tempStr;
};
