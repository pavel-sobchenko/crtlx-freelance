import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  LoginAction,
  LoginOutAction,
  LoginTokenAction,
  RegisterAction,
  UpdateAuthState
} from "@src/app/state/auth.action";
import { Injectable } from "@angular/core";
import { AuthService } from "@src/app/features/auth/services/auth.service";
import { Observable, tap } from "rxjs";
import { Token } from "@src/app/shared/models/token";
import { User } from "@src/app/shared/models/user";

export interface AuthStateModel {
  token: Token | null;
  username: string | null;
  isRemember: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: null,
    token: null,
    isRemember: false
  },
})

@Injectable()
export class AuthState {
  constructor(private readonly authService: AuthService) {
  }

  @Selector()
  public static token(state: AuthStateModel): Token | null {
    return state.token;
  }

  @Selector()
  public static username(state: AuthStateModel): string | null {
    return state.username;
  }

  @Selector()
  public static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(LoginAction)
  public login(context: StateContext<AuthStateModel>, action: LoginAction): Observable<Token> {
    const { username, password, isRemember } = action.payload;
    return this.authService.login(username, password, isRemember).pipe(
      tap((token) => {
        context.patchState({
          token: token,
          username: username,
          isRemember: isRemember
        })
      })
    );
  }

  @Action(LoginTokenAction)
  public loginToken(context: StateContext<AuthStateModel>, action: LoginTokenAction): Observable<Token> {
    return this.authService.loginToken(action.payload.token.refreshToken).pipe(
      tap((token) => {
        context.patchState({
          token: token,
        })
      })
    );
  }

  @Action(RegisterAction)
  public register(context: StateContext<AuthStateModel>, action: RegisterAction): Observable<User> {
    const { name, email, password } = action.payload;
    return this.authService.register(name, email, password).pipe(
      tap((user: User) => {
        context.patchState({
          username: user.username,
        })
      })
    );
  }

  @Action(LoginOutAction)
  public logout(context: StateContext<AuthStateModel>): void {
    this.authService.logout();
    context.patchState({
      username: null,
      token: null
    })
  }

  @Action(UpdateAuthState)
  public updateAuthState(context: StateContext<AuthStateModel>, action: UpdateAuthState): void {
    const { username, isRemember } = action.payload;
    const state = context.getState();
    context.setState({
      ...state,
      username: username ?? state.username,
      isRemember: isRemember ?? state.isRemember
    })
  }
}
