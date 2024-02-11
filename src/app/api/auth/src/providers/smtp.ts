import 'server-only'
import {ISessions} from "@/databases/mongoose/schema/sessions";
import {providers} from "@/app/api/auth";
import {NextRequest} from "next/server";
import {sendError, sendErrorRedirect} from "@/app/api";
import {createToken, decodeToken} from "@/app/api/auth/src/jwt";
import nodemailer, {Transporter} from "nodemailer"
import {nanoid} from "nanoid";
import {cookies} from "next/headers";
import {IAccounts} from "@/databases/mongoose/schema/accounts";
import {IUsers} from "@/databases/mongoose/schema/users";
import {createHash, validateHash} from "@/app/api/auth/src/hash";
import {Session} from "@/app/api/auth/src/functions/auth";

interface Config {
  tokenLifetime: number,
  host: string,
  port?: number,
  username?: string,
  password?: string
  secure: boolean
}

interface SmtpProviderToken {
  provider: "smtp",
  email: string,
  password: string,
  sub: string
}


export class SmtpProvider {
  private static instance: SmtpProvider | null = null;
  name: "smtp" = 'smtp'
  public credential: Config;
  private transporter: Transporter;

  private constructor(credential: Config) {
    // Initialize credential during the construction
    this.credential = credential

    console.log(credential.secure)

    this.transporter = nodemailer.createTransport({
      host: credential.host,
      port: credential.port,
      //secure: credential.secure, // upgrade later with STARTTLS
      auth: {
        user: credential.username,
        pass: credential.password
      }
    });

  }

  public static getInstance(config: Config): SmtpProvider {
    if (!this.instance) {
      this.instance = new SmtpProvider(config);
    }
    return this.instance
  }


  /**
   * Handles the callback from an external authentication provider.
   * Obtains the authentication code from the request and retrieves the access token.
   * Retrieves user data using the access token and performs various checks.
   * Saves the user data and token information.
   * Sets the session token and redirects the user back to the referring page.
   *
   * @param {NextRequest} request - The request object containing the authentication callback information.
   * @return {Response} - The redirect response.
   */
  public async handleCallback(request: NextRequest) {
    /*
    * This is going to be the callback for when the link is clicked from the mail inbox of the person its sent from
    * */

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) return sendErrorRedirect(400, "no code provided, please try again")

    const sessionTokenString = await providers[this.name].cache.getValue(code)
    if (!sessionTokenString) return sendErrorRedirect(404, "your sign in code has expired, please try again")

    const sessionToken = await decodeToken<SmtpProviderToken>(sessionTokenString)
    if (!sessionToken) return sendErrorRedirect(404, "your sign in code has expired, please try again")

    const payload = sessionToken.payload
    const [savedAccount, savedUser, savedSession, cacheValue] = await this.saveData(payload);

    console.log(savedSession)

    const cookie = cookies();
    const referrer = new URL(
      cookie.get("redirectUrl")?.value || "/",
      process.env.NEXTAUTH_URL,
    );
    cookie.delete("redirectUrl");

    return Response.redirect(referrer, 302);
  }

  /**
   * Handles the sign-in process and returns the OAuth URL.
   *
   * @param {NextRequest} request - The request object.
   * @param {string} [referer] - The referer URL.
   * @returns {Promise<Object>} - The JSON response containing the OAuth URL.
   */
  public async handleSignIn(request: NextRequest, referer?: string) {
    const activeProvider = providers[this.name]
    const email = request.headers.get('email')
    const password = request.headers.get('password')

    if (!email || !password) return sendErrorRedirect(400, 'Please provide a email and password')

    const [account, user] = await Promise.all([
      activeProvider.database.findAccount({
        accountId: email,
        provider: this.name
      }),
      activeProvider.database.findUser({
        accountId: email,
        provider: this.name
      })
    ])

    if (account && user) {
      const isPasswordCorrect = await validateHash(password, account.accessToken)
      if (!isPasswordCorrect) return sendError(401, "wrong password")

      const [sessionSchema] = await this.updateSession(account, user)
      if (sessionSchema) return sendError(200, "successfully sign in")
      else return sendErrorRedirect(500, "could not sign in, please try again")
    }

    const code = nanoid()
    const passwordVerificationToken = await createToken({
      provider: "smtp",
      email: email,
      password: password,
      sub: email
    }, new Date(Date.now() + 900000))

    // Save the value to the providers cache and expire in 15min
    await activeProvider.cache.setValue(code, passwordVerificationToken, {
      expire: 900000
    })

    await this.transporter.sendMail({
      from: 'Chance <no-reply@chancecant.design>',
      to: email,
      subject: "Verification Email",
      text: `${process.env.NEXTAUTH_URL}/api/auth/callback/smtp?code=${code}`
    })

    //Check if sign in, and if so please just return it as a token in cookies

    // redirect to check inbox screen
    const referrer = new URL(`/api/auth/message?message=${'Please check your inbox for a verification email'}`, process.env.NEXTAUTH_URL,);
    return Response.redirect(referrer, 302);
  }

  public async handleSignOut(request: NextRequest) {
    return
  }

  public async handleAuthCheck(token: string) {
    const selectedProvider = providers[this.name]
    const session = await selectedProvider.database.findSession({sessionToken: token});
    if (!session) return false;

    const account = await selectedProvider.database.findAccount({
      accountId: session.accountId,
      provider: this.name
    })
    if (!account) return false;

    const user = await selectedProvider.database.findUser({accountId: account.accountId})
    const jwtResult = await decodeToken(token)

    if (!user || !jwtResult || jwtResult.payload.email !== user.email || (!jwtResult.payload.exp || new Date() > new Date(jwtResult.payload.exp * 1000))) return false;

    return {user: user} as Session;
  }


  private async updateSession(accountSchema: IAccounts, user: IUsers) {
    const smtpProvider = providers[this.name]
    const expirationDate = new Date(Date.now() + this.credential.tokenLifetime)
    const sessionToken: string = await createToken({
      provider: "smtp",
      sub: user.email,
      email: user.email,
      accountId: user.email,
    }, expirationDate)

    const sessionSchema: ISessions = {
      sessionToken: sessionToken,
      accountId: user.email,
      expiresAt: new Date(Date.now() + this.credential.tokenLifetime),
      provider: 'smtp'
    };

    const createPromises: any = [
      smtpProvider.database.createSession(sessionSchema)
    ];

    if (smtpProvider.cache) {
      createPromises.push(
        smtpProvider.cache.setValue(
          sessionSchema.sessionToken,
          JSON.stringify(accountSchema), {
            expire: Math.floor(
              (new Date(expirationDate).getTime() - Date.now()) /
              1000,
            ),
          })
      );
    }

    const cookie = cookies();
    cookie.set({
      name: "SessionToken",
      value: sessionSchema.sessionToken,
    });

    return Promise.all(createPromises);
  }

  private async saveData(payload: SmtpProviderToken) {
    const smtpProvider = providers[this.name]

    const userSchema: IUsers = {
      accountId: payload.email,
      email: payload.email,
      name: payload.email.split('@')[0],
      image: `/icons/unknown-user.png`,
      emailVerified: true,
      provider: this.name
    };

    const accessToken = await createHash(payload.password)
    const accountSchema: IAccounts = {
      accountId: payload.email,
      provider: "smtp",
      accessToken: accessToken,
      refreshToken: "",
      expiresAt: undefined,
      scope: "email password",
    };

    const createPromises: any = [
      smtpProvider.database.createAccount(accountSchema),
      smtpProvider.database.createUser(userSchema),
      ...await this.updateSession(accountSchema, userSchema)
    ];

    return Promise.all(createPromises);
  }
}