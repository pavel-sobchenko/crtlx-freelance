import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { Store } from '@ngxs/store'
import { NavigationMenuComponent } from '../../components/navigation-menu/navigation-menu.component'
import { MenuItem } from '../../types/menu-item'
import { NavigationItemComponent } from '../../components/navigation-item/navigation-item.component'

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RouterLinkWithHref,
    RouterLinkActive,
    NavigationMenuComponent,
    NavigationItemComponent
  ],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
  public navigationMenu: MenuItem[] = [
    {
      title: 'Settings',
      route: '/settings',
      icon: 'fa fa-cog'
    }
  ]

  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}
}
