import { inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Store } from '@ngxs/store'
import { Observable, map } from 'rxjs'
import { AuthStateSelectors } from 'src/app/core/auth/state/auth.state.selectors'

export function signInPageGuard(): Observable<boolean | UrlTree> {
  const store = inject(Store)
  const router = inject(Router)

  return store.select(AuthStateSelectors.authenticated).pipe(
    map(authenticated => {
      return !authenticated || router.createUrlTree(['/'])
    })
  )
}
