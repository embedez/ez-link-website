import { Schema } from "mongoose";

export interface IUsers {
  name: string;
  email: string;
  image: string;
  accountId: string;
  provider: string;
  emailVerified: boolean;
}

export const UsersSchema = new Schema<IUsers>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  accountId: { type: String, required: true },
  provider: { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
});
