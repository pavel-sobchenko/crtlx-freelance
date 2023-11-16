import { Credentials } from '../types/credentials'
import { Tokens } from '../types/tokens'

export class SignIn {
  public static readonly type = '[Auth] SignIn'

  constructor(
    public readonly credentials: Credentials,
    public readonly remember: boolean
  ) {}
}

export class SignOut {
  public static readonly type = '[Auth] SignOut'
}

export class SetTokens {
  public static readonly type = '[Auth] SetTokens'
  constructor(public readonly tokens: Tokens) {}
}
