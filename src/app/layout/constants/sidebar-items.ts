import { SideBarItem } from '../types/side-bar-item'
import { InjectionToken } from '@angular/core'

export const sidebarItems: SideBarItem[] = [
  {
    title: 'Clients',
    route: '/clients',
    icon: 'fa fa-users'
  },
  {
    title: 'Invoices',
    route: '/invoices',
    icon: 'fa fa-file-text'
  }
]

export const SIDEBAR_ITEMS = new InjectionToken<SideBarItem[]>(
  'SIDEBAR_ITEMS',
  {
    factory: () => sidebarItems
  }
)

export const sideBarSettings: SideBarItem = {
  title: 'Settings',
  route: '/settings',
  icon: 'fa fa-cog'
}
export const SIDEBAR_SETTINGS = new InjectionToken<SideBarItem>(
  'SIDEBAR_SETTINGS',
  {
    factory: () => sideBarSettings
  }
)
