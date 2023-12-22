import { Routes } from '@angular/router'
import { authGuard } from '@core/auth/guards/auth.guard'
import { loginPageGuard } from './features/auth/guards/login-page.guard'

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.routes),
    canActivate: [loginPageGuard]
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  }
]
