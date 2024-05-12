import { type Document, type Model, Schema, Types } from "mongoose";
import createModel from "@/databases/mongoose/utils/createModel";
import { nanoid } from "nanoid";

export interface LinkType {
  shortCode: string,
  originalUrl: string,
  metadata?: LinkTypeMetadata
  userId?: string
}

export interface LinkTypeMetadata {

}

interface LinkEntryType extends Document, LinkType { }

export const LinkEntrySchema = new Schema<LinkEntryType>({
  shortCode: { type: String, unique: true, required: true, default: () => nanoid() },
  originalUrl: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  userId: { type: String, required: true, }
});

export type LinkEntry = Model<LinkEntryType>;
export default createModel<LinkEntryType, LinkEntry>(
  "Links",
  LinkEntrySchema,
  "links",
);
