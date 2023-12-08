import { Selector } from '@ngxs/store'
import { Tokens } from 'src/app/core/auth/types/tokens'
import { AuthStateModel, AuthStateService } from 'src/app/core/auth/state/auth-state.service'

export class AuthStateSelectors {
  @Selector([AuthStateService])
  public static token({ tokens }: AuthStateModel): Tokens {
    return tokens
  }

  @Selector([AuthStateService])
  public static isAuthenticated({ isAuthenticated }: AuthStateModel): boolean {
    return isAuthenticated
  }

  @Selector([AuthStateService])
  public static isLoginFormSubmitted({ isLoginFormSubmitted }: AuthStateModel): boolean {
    return isLoginFormSubmitted
  }
}
