import { Route } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'

export const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]
