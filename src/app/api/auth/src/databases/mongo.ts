import 'server-only'
import mongoose, {Document} from "mongoose";
import {IUsers} from "@/databases/mongoose/schema/users";
import {IAccounts} from "@/databases/mongoose/schema/accounts";
import {Accounts, Sessions, Users} from "@/databases/mongoose/model";
import {ISessions} from "@/databases/mongoose/schema/sessions";

interface Config {
  mongodb_url: string;
}


export class MongooseAuth {
  private static instance: MongooseAuth | null = null;
  private instance: MongooseAuth | null = null;

  private constructor(config: Config) {
    mongoose.connect(config.mongodb_url).then(() => console.log('Connected to Mongoose')).catch(() => console.log('Could not connect to mongoose'))
  }

  public static getInstance(config: Config): MongooseAuth {
    if (!this.instance) {
      this.instance = new MongooseAuth(config);
    }
    return this.instance
  }

  public async createAccount(data: IAccounts): Promise<IAccounts> {
    const account = await Accounts.findOneAndUpdate<IAccounts & Document>(
      {accountId: data.accountId},
      data,
      {new: true, upsert: true},
    );
    return account.toJSON();
  }

  public async createUser(data: IUsers): Promise<IUsers> {
    const user = await Users.findOneAndUpdate<IUsers & Document>(
      {accountId: data.accountId},
      data,
      {new: true, upsert: true},
    );
    return user.toJSON();
  }

  public async createSession(data: ISessions): Promise<ISessions> {
    const session = new Sessions(data);
    await session.save()

    return session.toJSON();
  }


  public async findAccount(data: Partial<IAccounts>): Promise<IAccounts | undefined> {
    try {
      const account = await Accounts.findOne<IAccounts & Document>(data);
      return account?.toJSON();
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  public async findUser(data: Partial<IUsers>): Promise<IUsers | undefined> {
    try {
      const user = await Users.findOne<IUsers & Document>(data);
      return user?.toJSON();
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  public async findSession(data: Partial<ISessions>): Promise<ISessions | undefined> {
    try {
      const session = await Sessions.findOne(data);
      return session?.toJSON();
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}