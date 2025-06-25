import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MenuItem } from '../../types/menu-item'
import { NavigationMenuItemComponent } from '../navigation-menu-item/navigation-menu-item.component'

@Component({
  selector: 'navigation-menu',
  standalone: true,
  imports: [NavigationMenuItemComponent],
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {
  @Input() public items: MenuItem[]
}
