import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { TokensStorageService } from '@core/auth/services/tokens-storage.service'
import { Store } from '@ngxs/store'
import { ToastrService } from 'ngx-toastr'
import { LogOut, SetTokens } from '@core/auth/state/auth.actions'
import { switchMap } from 'rxjs/operators'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'

export const refreshJwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const apiService = inject(AuthService)
  const tokenStorage = inject(TokensStorageService)
  const store = inject(Store)
  const toastr = inject(ToastrService)
  const rememberCredentials = store.selectSnapshot(
    AuthStateSelectors.rememberCredentials
  )

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('token/new')) {
        if (!rememberCredentials) {
          tokenStorage.set(null);
        }

        return handle401Error(req, next)
      }

      if (error.status === 403) {
        handle403Error()
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

        return nextFn(req)
      })
    )
  }

  function handle403Error(): void {
    toastr.error(
      'You do not have permission to perform this action.',
      'Forbidden'
    )
  }
}
