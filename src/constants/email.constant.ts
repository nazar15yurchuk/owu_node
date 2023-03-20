import { EEmailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "Dont panic, follow these steps",
    templateName: "forgotPassword",
  },
  [EEmailActions.ACTIVATE]: {
    subject: "ACTIVATE YOUR ACCOUNT",
    templateName: "activate",
  },
};
