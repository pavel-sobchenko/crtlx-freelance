export class GetUserProfile {
  public static readonly type = '[Auth] Get User Profile'
}

export class UpdateUserProfile {
  public static readonly type = '[Auth] Update User Profile'

  constructor(public readonly user: FormData) {}
}

export class ClearUserProfile {
  public static readonly type = '[Auth] Clear Profile'
}
