import { Injectable } from '@angular/core'
import { Action, State, StateContext } from '@ngxs/store'
import { Observable, tap } from 'rxjs'
import { AuthRepositoryService } from '../services/auth-repository.service'
import { TokensStorage } from '../services/tokens-storage.service'
import { Tokens } from '../types/tokens'
import { SetTokens, SignIn, SignOut } from './auth.state.actions'

export type AuthState = {
  authenticated?: boolean
  tokens?: Tokens
}

@State<AuthState>({ name: 'auth', defaults: {} })
@Injectable()
export class AuthStateService {
  constructor(
    private readonly _repository: AuthRepositoryService,
    private readonly _tokensStorage: TokensStorage
  ) {}

  @Action(SignIn)
  public signIn(
    { dispatch }: StateContext<AuthState>,
    { credentials, remember }: SignIn
  ): Observable<Tokens> {
    return this._repository.getToken(credentials).pipe(
      tap(tokens => dispatch(new SetTokens(tokens))),
      tap(tokens => remember && this._tokensStorage.set(tokens))
    )
  }

  @Action(SignOut)
  public signOut({ dispatch }: StateContext<AuthState>): void {
    this._tokensStorage.set(null)
    dispatch(new SetTokens(null))
  }

  @Action(SetTokens)
  public setTokens(
    { patchState }: StateContext<AuthState>,
    { tokens }: SetTokens
  ): void {
    patchState({ tokens, authenticated: !!tokens })
  }
}
