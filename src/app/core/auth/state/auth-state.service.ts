import { Action, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/core/auth/services/auth.service'
import { Observable, tap } from 'rxjs'
import { Tokens } from 'src/app/core/auth/types/tokens'
import { TokensStorageService } from "../services/tokens-storage.service";
import { Login, LoginOut, SetTokens, UpdateLoginFormSubmission } from "./auth.actions";
import { Router } from "@angular/router";

export interface AuthStateModel {
    tokens?: Tokens,
    isAuthenticated?: boolean
    isLoginFormSubmitted?: boolean
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        tokens: null,
        isAuthenticated: false,
        isLoginFormSubmitted: false
    }
})

@Injectable()
export class AuthStateService {
    constructor(
        private readonly _authService: AuthService,
        private readonly _tokenStorageService: TokensStorageService,
        private readonly _router: Router
    ) {
    }

    @Action(Login)
    public login(
        { patchState, dispatch }: StateContext<AuthStateModel>,
        { credentials, remember }: Login
    ): Observable<Tokens> {
        return this._authService.getToken(credentials).pipe(
            tap((tokens: Tokens) => {
                dispatch(new SetTokens(tokens))
            }),
            tap((tokens: Tokens) => {
                void this._router.navigate(['/'])
                remember && this._tokenStorageService.set(tokens)
                patchState({ isLoginFormSubmitted: false })
            })
        )
    }

    @Action(LoginOut)
    public logout(
        { dispatch }: StateContext<AuthStateModel>,
    ): void {
        this._tokenStorageService.clear()
        dispatch(new SetTokens(null))
    }

    @Action(SetTokens)
    public setTokens(
        { patchState }: StateContext<AuthStateModel>,
        { tokens }: SetTokens
    ): void {
        patchState({ tokens, isAuthenticated: !!tokens })
    }

    @Action(UpdateLoginFormSubmission)
    public updateLoginFormSubmission(
        context: StateContext<AuthStateModel>,
        { isLoginFormSubmitted }: UpdateLoginFormSubmission
    ): void {
        context.patchState({
            isLoginFormSubmitted
        })
    }
}
