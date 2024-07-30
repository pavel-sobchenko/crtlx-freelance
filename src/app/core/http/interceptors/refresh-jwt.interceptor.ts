import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { TokensStorageService } from '@core/auth/services/tokens-storage.service'
import { switchMap } from 'rxjs/operators'
import { Store } from '@ngxs/store'
import { LogOut, SetTokens } from '@core/auth/state/auth.actions'
import { ToastrService } from 'ngx-toastr'
import { ErrorResponse } from '@core/types/error-response'
import { addToken } from '@core/http/interceptors/utils'

export const refreshJwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const apiService = inject(AuthService)
  const tokenStorage = inject(TokensStorageService)
  const store = inject(Store)
  const toastr = inject(ToastrService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || req.url.includes('token/new')) {
        return throwError(() => error)
      }

      return handle401Error(req, next)
    })
  )

  function handle401Error(
    request: HttpRequest<unknown>,
    nextFn: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    const token = tokenStorage.get()?.refreshToken

    if (!token) {
      store.dispatch(new LogOut())

      return nextFn(req)
    }

    return apiService.refreshToken(token).pipe(
      switchMap(tokens => {
        store.dispatch(new SetTokens(tokens))
        req = addToken(req, tokens.accessToken)

        return nextFn(req)
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          store.dispatch(new LogOut())
        }
        toastr.error((err.error as ErrorResponse).message, err.statusText)

        return throwError(() => err)
      })
    )
  }
}
