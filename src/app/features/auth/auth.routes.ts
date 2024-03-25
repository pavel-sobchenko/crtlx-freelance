import { Route } from '@angular/router'
import { LoginPageComponent } from './pages/login/login-page.component'
import { RegistrationPageComponent } from './pages/registration/registration-page.component'
import { AuthPageComponent } from './pages/auth-page/auth-page.component'

export const routes: Route[] = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegistrationPageComponent
      }
    ]
  }
]
