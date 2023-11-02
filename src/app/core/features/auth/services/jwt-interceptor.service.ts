import { inject } from '@angular/core'
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Store } from '@ngxs/store'
import { AuthSelectors } from '../state/auth.selectors'

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const store = inject(Store)
  const userToken = store.selectSnapshot(AuthSelectors.token)
  const isApiUrl = req.url.startsWith(environment.apiUrl)
  if (userToken && isApiUrl) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${userToken.accessToken}`
      )
    })
  }
  return next(req)
}
