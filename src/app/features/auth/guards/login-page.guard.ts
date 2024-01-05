import { map, Observable } from 'rxjs'
import { Router, UrlTree } from '@angular/router'
import { Store } from '@ngxs/store'
import { inject } from '@angular/core'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'

export function loginPageGuard(): Observable<boolean | UrlTree> {
  const store = inject(Store)
  const router = inject(Router)

  return store.select(AuthStateSelectors.isAuthenticated).pipe(
    map(isAuthenticated => {
      return !isAuthenticated || router.createUrlTree(['/'])
    })
  )
}
