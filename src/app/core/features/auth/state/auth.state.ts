import { Action, State, StateContext } from '@ngxs/store'
import {
  LoginAction,
  LoginOutAction,
  LoginTokenAction,
  UpdateLoginFormSubmission,
  UpdateRememberStatus
} from 'src/app/core/features/auth/state/auth.actions'
import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/core/features/auth/services/auth.service'
import { finalize, Observable, tap } from 'rxjs'
import { TokenResponseModel } from 'src/app/core/features/auth/types/token-response.model'
import { UserName } from 'src/app/core/features/auth/types/user-login.model'
import { REMEMBER, TOKEN } from '../auth.constants.'
import { Router } from '@angular/router'

export interface AuthStateModel {
  token: TokenResponseModel
  username: UserName
  isRemember: boolean
  isLoginFormSubmitted: boolean
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: null,
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
  ): Observable<TokenResponseModel> {
    const { username, password } = action.payload
    return this._authService.login(username, password).pipe(
      tap(token => {
        context.patchState({
          token: token,
          username: username
        })
        void this._router.navigate(['/home'])
        window.localStorage.setItem(TOKEN, JSON.stringify(token))
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
  ): Observable<TokenResponseModel> {
    const refreshToken = action.payload?.token?.refreshToken as string
    return this._authService.loginToken(refreshToken).pipe(
      tap(token => {
        context.patchState({
          token: token
        })
        void this._router.navigate(['/home'])
      })
    )
  }

  @Action(LoginOutAction)
  public logout(context: StateContext<AuthStateModel>): void {
    this._authService.logout()
    context.patchState({
      username: null,
      token: null
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
