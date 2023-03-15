import { Twilio } from "twilio";

import { configs } from "../configs";
import { smsTemplate } from "../constants";
import { ESmsActionEnum } from "../enums";
import { ApiError } from "../errors";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsAction: ESmsActionEnum) {
    try {
      const message = smsTemplate[smsAction];

      await this.client.messages.create({
        body: message,
        to: phone,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
      });
    } catch (e) {
      throw new ApiError(e.message, 500);
    }
  }
}

export const smsService = new SmsService();
