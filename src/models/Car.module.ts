import { model, Schema, Types } from "mongoose";

import { IUser, IUserModel } from "../types";
import { User } from "./User.module";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Car = model<IUser, IUserModel>("car", carSchema);
