import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { NavigationMenuComponent } from '../../components/navigation-menu/navigation-menu.component'
import { MenuItem } from '../../types/menu-item'
import { NavigationItemComponent } from '../../components/navigation-item/navigation-item.component'

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [LogoComponent, NavigationMenuComponent, NavigationItemComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
  public topMenu: MenuItem[] = []
  public bottomMenu: MenuItem[] = [
    {
      title: 'Settings',
      route: '/settings',
      icon: 'fa fa-cog'
    }
  ]
}
