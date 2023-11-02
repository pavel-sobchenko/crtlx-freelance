import { Routes } from '@angular/router'
import { authGuard } from 'src/app/core/features/auth/services/auth.guard'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/features/auth/auth.routes').then(m => m.routes)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  }
]
