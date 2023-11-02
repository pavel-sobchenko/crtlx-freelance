import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { TOKEN } from '../auth.constants.'

export const authGuard = (): boolean => {
  const router = inject(Router)
  if (localStorage.getItem(TOKEN)) {
    return true
  } else {
    void router.navigate(['/login'])
    return false
  }
}
