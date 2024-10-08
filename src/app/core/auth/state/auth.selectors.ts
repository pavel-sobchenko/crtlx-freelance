import { Selector } from '@ngxs/store'
import { Tokens } from '@core/auth/types/tokens'
import { AuthState, AuthStateService } from '@core/auth/state/auth-state.service'
import { User } from '@core/auth/types/user'

export class AuthStateSelectors {
  @Selector([AuthStateService])
  public static token({ tokens }: AuthState): Tokens {
    return tokens
  }

  @Selector([AuthStateService])
  public static isAuthenticated({ isAuthenticated }: AuthState): boolean {
    return isAuthenticated
  }

  @Selector([AuthStateService])
  public static loading({ loading }: AuthState): boolean {
    return loading
  }

  @Selector([AuthStateService])
  public static user({ user }: AuthState): User {
    return user
  }
}
