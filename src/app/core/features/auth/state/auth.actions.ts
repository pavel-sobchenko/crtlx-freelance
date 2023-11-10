import { TokenResponse } from 'src/app/core/features/auth/types/token-response'

export class LoginAction {
  public static readonly type = '[Auth] Login'

  constructor(public payload: { username: string; password: string }) {
  }
}

export class LoginTokenAction {
  public static readonly type = '[Auth] Login Token'

  constructor(public payload: { token: TokenResponse }) {
  }
}

export class InitAuthStateAction {
  public static readonly type = '[Auth] Init State'
}

export class LoginOutAction {
  public static readonly type = '[Auth] Logout'
}

export class UpdateLoginFormSubmission {
  public static readonly type = '[Auth] Submission'

  constructor(public payload: { isLoginFormSubmitted: boolean }) {
  }
}

export class UpdateRememberStatus {
  public static readonly type = '[Auth] Remember Me'

  constructor(public payload: { isRemember: boolean }) {
  }
}
