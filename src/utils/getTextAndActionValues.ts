import actions from "../config/bot_actions";

const getTextAndActionValues = () => {
  const menuActionValues = Object.keys(actions).map((key) => actions[key as keyof typeof actions]?.action);
  const menuTextValues = Object.keys(actions).map((key) => actions[key as keyof typeof actions]?.text);

  return [...menuActionValues, ...menuTextValues];
};

export default getTextAndActionValues;
