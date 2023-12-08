import { inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Store } from "@ngxs/store";
import { AuthStateSelectors } from "../state/auth.selectors";
import { map, Observable } from "rxjs";

export const authGuard = (): Observable<boolean | UrlTree> => {
    const router = inject(Router)
    const store = inject(Store);
    return store.select(AuthStateSelectors.isAuthenticated).pipe(
        map(authenticated => {
            return authenticated || router.createUrlTree(['/login'])
        })
    )
}
