import { Tokens } from '../../auth/types/tokens'
import { Credentials, LoginCredentials } from '../types/credentials'

export class Login {
  public static readonly type = '[Auth] Login'

  constructor(public readonly credentials: LoginCredentials) {}
}

export class LogOut {
  public static readonly type = '[Auth] Logout'
}

export class SetTokens {
  public static readonly type = '[Auth] Set Tokens'

  constructor(public readonly tokens: Tokens) {}
}

export class SetIsLoading {
  public static readonly type = '[Auth] Set Is Loading'

  constructor(public readonly loading: boolean) {}
}

export class Register {
  public static readonly type = '[Auth] Register'

  constructor(public readonly credentials: Credentials) {}
}

export class GetUserProfile {
  public static readonly type = '[Auth] Get User Profile'
}

export class UpdateUserProfile {
  public static readonly type = '[Auth] Update User Profile'

  constructor(public readonly user: FormData) {}
}
