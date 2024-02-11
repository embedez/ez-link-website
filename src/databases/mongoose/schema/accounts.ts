import { Schema } from "mongoose";

export interface IAccounts {
  accountId: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
  expiresAt?: Date | undefined;
  tokenType?: string;
  scope: string;
}

export const AccountsSchema = new Schema<IAccounts>({
  accountId: { type: String, required: true },
  provider: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: false },
  tokenType: { type: String, required: false },
  scope: { type: String, required: true },
});
