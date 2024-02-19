import { Selector } from '@ngxs/store'
import { Tokens } from '@core/auth/types/tokens'
import { AuthState, AuthStateService } from '@core/auth/state/auth-state.service'

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
  public static isLoading({ loading }: AuthState): boolean {
    return loading
  }
}
