import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { TokensStorageService } from '@core/auth/services/tokens-storage.service'
import { Store } from '@ngxs/store'
import { ToastrService } from 'ngx-toastr'
import { LogOut, SetTokens } from '@core/auth/state/auth.actions'
import { switchMap } from 'rxjs/operators'
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
      if (error.status === 401 && !req.url.includes('token/new')) {
        return handle401Error(req, next)
      }

      if (error.status === 403) {
        return handle403Error(req, next)
      }

      return throwError(() => error)
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
        return throwError(() => err)
      })
    )
  }

  function handle403Error(
    request: HttpRequest<unknown>,
    nextFn: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    store.dispatch(new LogOut())
    toastr.error(
      'You do not have permission to perform this action.',
      'Forbidden'
    )

    return throwError(() => new HttpErrorResponse({ ...request, status: 403 }))
  }
}
