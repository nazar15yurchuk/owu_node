import { Model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  avatar?: string;
  phone?: string;
}

export interface IUserMethods {
  nameWithAge(): void;
}

export interface IUserVirtual {
  nameWithSurname: string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtual> {
  findByName(name: string): Promise<IUser[]>;
}
