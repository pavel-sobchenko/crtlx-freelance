import { Action, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { finalize, Observable, tap } from 'rxjs'
import { Tokens } from '@core/auth/types/tokens'
import { TokensStorageService } from '../services/tokens-storage.service'
import { GetUserProfile, Login, LogOut, Register, SetIsLoading, SetTokens, UpdateUserProfile } from './auth.actions'
import { Router } from '@angular/router'
import { User } from '@core/auth/types/user'

export interface AuthState {
  tokens?: Tokens
  isAuthenticated?: boolean
  loading?: boolean
  user?: User
}

const defaultState: AuthState = {}

@State<AuthState>({
  name: 'auth',
  defaults: defaultState
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
    { credentials }: Login
  ): Observable<Tokens> {
    dispatch(new SetIsLoading(true))

    return this._authService.getToken(credentials).pipe(
      tap(tokens => {
        dispatch(new SetTokens(tokens))
        this._tokenStorageService.set(tokens, credentials.remember)
      }),
      finalize(() => dispatch(new SetIsLoading(false)))
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
    { loading }: SetIsLoading
  ): void {
    patchState({ loading })
  }

  @Action(Register)
  public register(
    { dispatch }: StateContext<AuthState>,
    { credentials }: Register
  ): Observable<number> {
    dispatch(new SetIsLoading(true))

    return this._authService
      .register(credentials)
      .pipe(finalize(() => dispatch(new SetIsLoading(false))))
  }

  @Action(GetUserProfile)
  public getUserProfile({
    patchState
  }: StateContext<AuthState>): Observable<User> {
    return this._authService
      .getUserProfile()
      .pipe(tap(user => patchState({ user })))
  }

  @Action(UpdateUserProfile)
  public updateUserInfo(
    { dispatch }: StateContext<AuthState>,
    { user }: UpdateUserProfile
  ): Observable<User> {
    return this._authService
      .updateUserInfo(user)
      .pipe(finalize(() => dispatch(new GetUserProfile())))
  }
}
