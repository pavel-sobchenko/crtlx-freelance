import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { MenuItem } from '../../types/menu-item'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'navigation-menu-item',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navigation-menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuItemComponent {
  @Input() public item: MenuItem
}
