import { Route } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'

export const appLayerRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'clients',
        loadComponent: () =>
          import('./pages/clients/clients.component').then(
            m => m.ClientsComponent
          )
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./pages/invoices/invoices.component').then(
            m => m.InvoicesComponent
          )
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            m => m.SettingsComponent
          )
      },
      {
        path: '',
        redirectTo: '/clients',
        pathMatch: 'full'
      }
    ]
  }
]
