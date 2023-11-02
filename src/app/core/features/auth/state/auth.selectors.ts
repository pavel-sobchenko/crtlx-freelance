import { Selector } from '@ngxs/store'
import { TokenResponseModel } from 'src/app/core/features/auth/types/token-response.model'
import { UserName } from 'src/app/core/features/auth/types/user-login.model'
import { AuthState, AuthStateModel } from 'src/app/core/features/auth/state/auth.state'

export class AuthSelectors {
  @Selector([AuthState])
  public static token(state: AuthStateModel): TokenResponseModel {
    return state.token
  }

  @Selector([AuthState])
  public static username(state: AuthStateModel): UserName {
    return state.username
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
