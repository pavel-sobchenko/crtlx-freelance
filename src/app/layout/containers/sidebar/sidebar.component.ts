import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { NavigationMenuComponent } from '../../components/navigation-menu/navigation-menu.component'
import { MenuItem } from '../../types/menu-item'

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [LogoComponent, NavigationMenuComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'grow-0 bg-white py-4 px-8' }
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
