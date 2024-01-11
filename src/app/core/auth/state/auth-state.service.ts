import { Action, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { catchError, Observable, tap } from 'rxjs'
import { Tokens } from '@core/auth/types/tokens'
import { TokensStorageService } from '../services/tokens-storage.service'
import {
  Login,
  LogOut,
  Register,
  SetIsLoading,
  SetTokens,
  ValidateEmail
} from './auth.actions'
import { Router } from '@angular/router'
import { RegisterData } from '@core/auth/types/credentials'
import { HttpErrorResponse } from '@angular/common/http'

export interface AuthState {
  tokens?: Tokens
  isAuthenticated?: boolean
  loading?: boolean
  username?: string
  email?: string
  validationEmailError?: string
}

@State<AuthState>({
  name: 'auth',
  defaults: {
    tokens: null,
    isAuthenticated: false,
    loading: false,
    username: null,
    email: null,
    validationEmailError: null
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

  @Action(ValidateEmail)
  public validateEmail(
    { dispatch, patchState }: StateContext<AuthState>,
    { email }: ValidateEmail
  ): Observable<boolean> {
    dispatch(new SetIsLoading(true))
    return this._authService.validateEmail(email).pipe(
      tap(() => {
        patchState({ validationEmailError: null })
      }),
      catchError((e: HttpErrorResponse) => {
        const msg = (e.error as ErrorEvent).message
        patchState({
          validationEmailError: msg
        })
        dispatch(new SetIsLoading(false))
        throw new Error(msg)
      })
    )
  }

  @Action(Register)
  public register(
    { dispatch, patchState }: StateContext<AuthState>,
    { userData }: Register
  ): Observable<RegisterData> {
    dispatch(new SetIsLoading(true))
    return this._authService.register(userData).pipe(
      tap(() => {
        patchState({
          username: userData.name,
          email: userData.email
        })
      })
    )
  }
}
