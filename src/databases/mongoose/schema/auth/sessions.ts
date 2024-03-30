import { type Document, type Model, Schema } from "mongoose";
import createModel from "@/databases/mongoose/utils/createModel";

export interface SessionType {
  sessionToken: string;
  provider: string;
  accountId: string;
  expiresAt: Date;
}

interface SessionEntryType extends Document, SessionType {}

export const SessionEntrySchema = new Schema<SessionEntryType>({
  accountId: { type: String, required: true },
  provider: { type: String, required: true },
  sessionToken: { type: String, required: true },
  expiresAt: { type: Date, required: true, expires: 604800 },
});

export type SessionEntry = Model<SessionEntryType>;
export default createModel<SessionEntryType, SessionEntry>(
  "Sessions",
  SessionEntrySchema,
  "sessions",
);
