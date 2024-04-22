import { Route } from '@angular/router'
import { MainDashboardPageComponent } from '../layout/pages/main-dashboard-page/main-dashboard-page.component'
import { PageNotFoundComponent } from '../views/pages/page-not-found/page-not-found.component'

export const projectFeaturesModule: Route[] = [
  {
    path: '',
    component: MainDashboardPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/clients',
        pathMatch: 'full'
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./clients/pages/clients-page/clients-page.component').then(
            m => m.ClientsPageComponent
          )
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./invoices/pages/invoices-page/invoices-page.component').then(
            m => m.InvoicesPageComponent
          )
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/pages/settings-page/settings-page.component').then(
            m => m.SettingsPageComponent
          )
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
]
