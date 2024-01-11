import { Route } from '@angular/router'
import { LoginPageComponent } from './pages/login/login-page.component'
import { RegistrationPageComponent } from './pages/registration/registration-page.component'

export const routes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegistrationPageComponent
  }
]
