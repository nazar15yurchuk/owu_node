import { ESmsActionEnum } from "../enums";

export const smsTemplate: { [key: string]: string } = {
  [ESmsActionEnum.WELCOME]: "Great to see you",
  [ESmsActionEnum.FORGOT_PASSWORD]: "Dont worry about this situation",
};
