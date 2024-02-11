import { Schema, type Document } from "mongoose";

export interface ISessions {
  sessionToken: string;
  provider: string
  accountId: string
  expiresAt: Date
}

export const SessionsSchema = new Schema<ISessions & Document>({
  accountId: {type: String, required: true},
  provider: {type: String, required: true},
  sessionToken: {type: String, required: true},
  expiresAt: { type: Date, required: true, expires: 604800},
});
