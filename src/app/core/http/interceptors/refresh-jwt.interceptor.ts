import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { catchError, Observable, switchMap } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '@core/auth/services/auth.service'
import { Tokens } from '@core/auth/types/tokens'
import { TokensStorageService } from '@core/auth/services/tokens-storage.service'

export const refreshJwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const apiService = inject(AuthService)
  const tokenStorage = inject(TokensStorageService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('new')) {
        const token = tokenStorage.get().refreshToken
        return apiService.refreshToken(token).pipe(
          switchMap((response: Tokens) => {
            if (response?.refreshToken) {
              tokenStorage.set(response)
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              })
              return next(req)
            }
            tokenStorage.clear()
            throw new Error('Refresh token is missing')
          }),
          catchError(() => {
            tokenStorage.clear()
            throw new Error('Refresh token is missing')
          })
        )
      }
      throw error
    })
  )
}
