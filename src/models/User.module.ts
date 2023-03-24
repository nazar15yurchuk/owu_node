import { model, Schema } from "mongoose";

import { EGenders } from "../enums";
import { EUserStatus } from "../enums";
import { IUser, IUserModel } from "../types";

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
    age: {
      type: Number,
      required: true,
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

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Yurchuk`;
});

userSchema.methods = {
  nameWithAge() {
    return `${this.name} is ${this.age} year old`;
  },
};

userSchema.statics = {
  findByName: async function (name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

export const User = model<IUser, IUserModel>("user", userSchema);
