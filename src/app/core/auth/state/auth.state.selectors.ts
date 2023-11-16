import { Selector } from '@ngxs/store'
import { Tokens } from '../types/tokens'
import { AuthState, AuthStateService } from './auth.state.service'

export class AuthStateSelectors {
  @Selector([AuthStateService])
  public static authenticated({ authenticated }: AuthState): boolean {
    return authenticated
  }

  @Selector([AuthStateService])
  public static tokens({ tokens }: AuthState): Tokens {
    return tokens
  }
}
