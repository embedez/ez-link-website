import { RedisClient } from "suna-auth-redis";
import { DiscordProvider } from "suna-auth-discord";
import { MongooseAuth } from "suna-auth-mongoose";
import { SmtpProvider } from "suna-auth-smtp";
import { Auth } from "suna-auth";
import { AccountType, Session, SessionType, UserType } from "suna-auth/dist/types";

const initialize = new Auth(
  {
    discord: {
      cache: RedisClient.getInstance({ redis_url: process.env.REDIS_URL! }),
      provider: DiscordProvider.getInstance({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        scopes: ["identify", "email", "guilds", "guilds.join"],
        authorization: "https://discord.com/api/oauth2/authorize",
      }),
      database: MongooseAuth.getInstance({ mongodb_url: process.env.MONGODB_URL! }),
    },
    smtp: {
      database: MongooseAuth.getInstance({ mongodb_url: process.env.MONGODB_URL! }),
      provider: SmtpProvider.getInstance({
        tokenLifetime: 60 * 60 * 1000, // The max is 1 week
        host: process.env.SMTP_HOST!,
        from: process.env.SMTP_FROM!,
        port: Number(process.env.SMTP_PORT!),
        password: process.env.SMTP_PASSWORD!,
        username: process.env.SMTP_USERNAME!,
        secure: process.env.SMTP_SECURE === "true",
      }),
      cache: RedisClient.getInstance({ redis_url: process.env.REDIS_URL! }),
    },
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    algorithm: "RS256",
  },
  {
    handleAuthCheck: async (session: CustomSession) => {
      return session;
    },
    handleCreate: async (
      account: AccountType,
      user: UserType,
      session: SessionType,
    ) => {
      return true;
    },
  },
);

export interface CustomSession extends Session {

}

export const auth = initialize.auth as () => Promise<false | CustomSession>;
export const routes = initialize.routes;
