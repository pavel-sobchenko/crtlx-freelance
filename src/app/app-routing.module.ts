import { Routes } from "@angular/router";

export const routes: Routes = [

  { path: '', loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes) },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent) },

];

