import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { TokensStorageService } from '@core/auth/services/tokens-storage.service'
import { Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Tokens } from '@core/auth/types/tokens'
import { ErrorResponse } from '@core/types/error-response'
import { Store } from '@ngxs/store'
import { LogOut } from '@core/auth/state/auth.actions'
import { ToastrService } from 'ngx-toastr'

export const refreshJwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const apiService = inject(AuthService)
  const tokenStorage = inject(TokensStorageService)
  const router = inject(Router)
  const store = inject(Store)
  const toastr = inject(ToastrService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('new')) {
        if (tokenStorage.get()?.accessToken) {
          const token = tokenStorage.get()?.refreshToken

          return apiService.refreshToken(token).pipe(
            switchMap((tokens: Tokens) => {
              tokenStorage.set(tokens)
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.accessToken}`
                }
              })

              return next(req)
            }),
            catchError((err: ErrorResponse) => {
              if (err.statusCode === 403) {
                store.dispatch(new LogOut())
                void router.navigate(['auth/login'])
              }
              toastr.error(err.message, err.error)

              return throwError(() => error)
            })
          )
        }

        return next(req)
      }

      return throwError(() => error)
    })
  )
}
