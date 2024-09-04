import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'

const apiUrl = 'http://localhost:3000/'

export const addApiBaseUrlInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (!request.url.startsWith('/api/')) {
    return next(request)
  }

  const withApiUrl = request.clone({
    url: request.url.replace('/api/', `${apiUrl}`)
  })

  return next(withApiUrl)
}
