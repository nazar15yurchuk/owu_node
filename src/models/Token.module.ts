import { model, Schema, Types } from "mongoose";

import { User } from "./User.module";

const tokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      ref: User,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Token = model("Token", tokenSchema);
