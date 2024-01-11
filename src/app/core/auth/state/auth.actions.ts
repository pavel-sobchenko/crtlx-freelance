import { Tokens } from '../../auth/types/tokens'
import { Credentials, RegisterData } from '../types/credentials'

export class Login {
  public static readonly type = '[Auth] Login'

  constructor(
    public readonly credentials: Credentials,
    public readonly remember: boolean
  ) {}
}

export class LogOut {
  public static readonly type = '[Auth] Logout'
}

export class SetTokens {
  public static readonly type = '[Auth] Set Tokens'

  constructor(public tokens: Tokens) {}
}

export class SetIsLoading {
  public static readonly type = '[Auth] Set Is Loading'

  constructor(public isLoading: boolean) {}
}

export class ValidateEmail {
  public static readonly type = '[Auth] Validate Email'

  constructor(public email: string) {}
}

export class Register {
  public static readonly type = '[Auth] Register'

  constructor(public userData: RegisterData) {}
}
