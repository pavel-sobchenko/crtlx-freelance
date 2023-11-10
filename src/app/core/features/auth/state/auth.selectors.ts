import { Selector } from '@ngxs/store'
import { TokenResponse } from 'src/app/core/features/auth/types/token-response'
import { AuthState, AuthStateModel } from 'src/app/core/features/auth/state/auth.state'

export class AuthSelectors {
  @Selector([AuthState])
  public static token(state: AuthStateModel): TokenResponse {
    return state.token
  }

  @Selector([AuthState])
  public static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token
  }

  @Selector([AuthState])
  public static isLoginFormSubmitted(state: AuthStateModel): boolean {
    return state.isLoginFormSubmitted
  }

  @Selector([AuthState])
  public static isRemember(state: AuthStateModel): boolean {
    return state.isRemember
  }
}
