import { Action, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { Observable, tap } from 'rxjs'
import { Tokens } from '@core/auth/types/tokens'
import { TokensStorageService } from '../services/tokens-storage.service'
import { Login, LogOut, SetIsLoading, SetTokens } from './auth.actions'
import { Router } from '@angular/router'

export interface AuthState {
  tokens?: Tokens
  isAuthenticated?: boolean
  loading?: boolean
}

@State<AuthState>({
  name: 'auth',
  defaults: {
    tokens: null,
    isAuthenticated: false,
    loading: false
  }
})
@Injectable()
export class AuthStateService {
  constructor(
    private readonly _authService: AuthService,
    private readonly _tokenStorageService: TokensStorageService,
    private readonly _router: Router
  ) {}

  @Action(Login)
  public login(
    { dispatch }: StateContext<AuthState>,
    { credentials, remember }: Login
  ): Observable<Tokens> {
    dispatch(new SetIsLoading(true))
    return this._authService.getToken(credentials).pipe(
      tap(tokens => {
        dispatch(new SetTokens(tokens))
        remember && this._tokenStorageService.set(tokens)
      })
    )
  }

  @Action(LogOut)
  public logout({ dispatch }: StateContext<AuthState>): void {
    this._tokenStorageService.clear()
    dispatch(new SetTokens(null))
  }

  @Action(SetTokens)
  public setTokens(
    { patchState }: StateContext<AuthState>,
    { tokens }: SetTokens
  ): void {
    patchState({ tokens, isAuthenticated: !!tokens })
  }

  @Action(SetIsLoading)
  public setIsLoading(
    { patchState }: StateContext<AuthState>,
    { isLoading }: SetIsLoading
  ): void {
    patchState({ loading: isLoading })
  }
}
