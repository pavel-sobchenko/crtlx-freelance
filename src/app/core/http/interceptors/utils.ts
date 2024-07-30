import { HttpRequest } from '@angular/common/http'

export const addToken = (
  request: HttpRequest<unknown>,
  token: string | null
): HttpRequest<unknown> => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
