import { Routes } from '@angular/router'
import { authGuard } from '@core/auth/guards/auth.guard'
import { loginPageGuard } from './features/auth/guards/login-page.guard'
import { MainDashboardPageComponent } from './layout/pages/main-dashboard-page/main-dashboard-page.component'

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.routes),
    canActivate: [loginPageGuard]
  },
  {
    path: '',
    component: MainDashboardPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/settings',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.route').then(m => m.routes)
      }
    ],
    canActivate: [authGuard]
  }
]
