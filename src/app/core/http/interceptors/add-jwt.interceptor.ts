import { inject } from '@angular/core'
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { Store } from '@ngxs/store'
import { AuthStateSelectors } from '../../auth/state/auth.selectors'
import { addToken } from '@core/http/interceptors/utils'

export const addJwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const store = inject(Store)
  const userToken = store.selectSnapshot(AuthStateSelectors.token)
  const isApiUrl = req.url.startsWith('/api')

  if (userToken && isApiUrl) {
    req = addToken(req, userToken.accessToken)
  }

  return next(req)
}
