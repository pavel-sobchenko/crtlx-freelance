import { Route } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "@src/app/features/auth/register/register.component";

export const routes: Route[] = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];
