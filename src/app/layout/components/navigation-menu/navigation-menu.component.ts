import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MenuItem } from '../../types/menu-item'
import { NavigationItemComponent } from '../navigation-item/navigation-item.component'
import { NgFor } from '@angular/common'

@Component({
  selector: 'navigation-menu',
  standalone: true,
  imports: [NgFor, NavigationItemComponent],
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {
  @Input() public items: MenuItem[]
}
