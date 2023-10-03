import { Token } from "@src/app/shared/models/token";

export class LoginAction {
  public static readonly type = '[Auth] Login';

  constructor(public payload: { username: string; password: string, isRemember?: boolean }) {
  }
}

export class LoginTokenAction {
  public static readonly type = '[Auth] Login Token';

  constructor(public payload: { token: Token }) {
  }
}

export class RegisterAction {
  public static readonly type = '[Auth] Register';

  constructor(public payload: { name: string; email: string; password: string }) {
  }
}

export class LoginOutAction {
  public static readonly type = '[Auth] Logout';
}

export class UpdateAuthState {
  public static readonly type = '[Auth] Update Auth State';

  constructor(public payload: { username?: string | null, isRemember?: boolean }) {
  }
}
