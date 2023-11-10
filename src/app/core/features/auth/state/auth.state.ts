import { Action, State, StateContext } from '@ngxs/store'
import {
  InitAuthStateAction,
  LoginAction,
  LoginOutAction,
  LoginTokenAction,
  UpdateLoginFormSubmission,
  UpdateRememberStatus
} from 'src/app/core/features/auth/state/auth.actions'
import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/core/features/auth/services/auth.service'
import { finalize, Observable, tap } from 'rxjs'
import { TokenResponse } from 'src/app/core/features/auth/types/token-response'
import { Router } from '@angular/router'

const TOKEN = 'jwToken';
const REMEMBER = 'remember';

export interface AuthStateModel {
  token: TokenResponse
  isRemember: boolean
  isLoginFormSubmitted: boolean
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    isRemember: false,
    isLoginFormSubmitted: false
  }
})
@Injectable()
export class AuthState {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
  }

  @Action(LoginAction)
  public login(
      context: StateContext<AuthStateModel>,
      action: LoginAction
  ): Observable<TokenResponse> {
    const { username, password } = action.payload
    return this._authService.login(username, password).pipe(
        tap((token: TokenResponse) => {
          context.patchState({
            token
          })
          void this._router.navigate(['/home'])
          if (context.getState().isRemember) {
            window.localStorage.setItem(TOKEN, JSON.stringify(token))
          } else {
            window.sessionStorage.setItem(TOKEN, JSON.stringify(token))
          }
        }),
      finalize(() => {
        context.patchState({
          isLoginFormSubmitted: false
        })
      })
    )
  }

  @Action(LoginTokenAction)
  public loginToken(
      context: StateContext<AuthStateModel>,
      action: LoginTokenAction
  ): Observable<TokenResponse> {
    const refreshToken = action.payload?.token?.refreshToken as string
    return this._authService.loginToken(refreshToken).pipe(
        tap(token => {
          context.patchState({
            token
          })
          void this._router.navigate(['/home'])
        })
    )
  }

  @Action(InitAuthStateAction)
  public initAuthState(context: StateContext<AuthStateModel>): void {
    let jwToken;
    const remember = window.localStorage.getItem(REMEMBER)
    if (remember) {
      context.patchState({
        isRemember: true
      })
    }

    if (remember) {
      jwToken = window.localStorage.getItem(TOKEN)
    } else {
      jwToken = window.sessionStorage.getItem(TOKEN)
    }
    const token = JSON.parse(jwToken as string) as TokenResponse

    if (token) {
      context.patchState({
        token
      })
      void this._router.navigate(['/home'])
    }
  }

  @Action(LoginOutAction)
  public logout(context: StateContext<AuthStateModel>): void {
    window.localStorage.clear()
    window.sessionStorage.clear()
    context.patchState({
      token: null,
      isRemember: false,
      isLoginFormSubmitted: false
    })
  }

  @Action(UpdateLoginFormSubmission)
  public updateLoginFormSubmission(
    context: StateContext<AuthStateModel>,
    action: UpdateLoginFormSubmission
  ): void {
    const { isLoginFormSubmitted } = action.payload
    context.patchState({
      isLoginFormSubmitted
    })
  }

  @Action(UpdateRememberStatus)
  public UpdateRememberStatus(
    context: StateContext<AuthStateModel>,
    action: UpdateRememberStatus
  ): void {
    const { isRemember } = action.payload
    context.patchState({
      isRemember
    })
    if (isRemember) {
      window.localStorage.setItem(REMEMBER, JSON.stringify(isRemember))
    } else {
      window.localStorage.removeItem(REMEMBER)
    }
  }
}
