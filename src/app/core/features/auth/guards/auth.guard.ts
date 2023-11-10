import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from "@ngxs/store";
import { AuthSelectors } from "../state/auth.selectors";

export const authGuard = (): boolean => {
  const router = inject(Router)
  const store = inject(Store);
  const isAuthenticated = store.selectSnapshot(AuthSelectors.isAuthenticated);
  if (isAuthenticated) {
    return true
  } else {
    void router.navigate(['/login'])
    return false
  }
}
