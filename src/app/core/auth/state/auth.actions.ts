import { Tokens } from 'src/app/core/auth/types/tokens'
import { Credentials } from "../types/credentials";

export class Login {
  public static readonly type = '[Auth] Login'

  constructor(public readonly credentials: Credentials, public readonly remember: boolean) {
  }
}

export class LoginOut {
  public static readonly type = '[Auth] Logout'
}

export class SetTokens {
  public static readonly type = '[Auth] Set Tokens'

  constructor(public tokens: Tokens) {
  }
}

export class UpdateLoginFormSubmission {
  public static readonly type = '[Auth] Submit Login Form'

  constructor(public isLoginFormSubmitted: boolean) {
  }
}
