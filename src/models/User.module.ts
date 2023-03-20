import { model, Schema } from "mongoose";

import { EGenders } from "../enums";
import { EUserStatus } from "../enums";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("user", userSchema);
