import path from "node:path";

import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";

import { configs } from "../configs";
import { allTemplates } from "../constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter: Transporter;
  public templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_EMAIL_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }

  public async sendMail(
    email: string,
    emailActions: EEmailActions,
    locals: Record<string, string> = {}
  ) {
    try {
      const templateInfo = allTemplates[emailActions];
      locals.frontUrl = configs.FRONT_URL;

      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals
      );

      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

export const emailService = new EmailService();
