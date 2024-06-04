import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { MenuItem } from '../../types/menu-item'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'navigation-item',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navigation-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {
  @Input() public item: MenuItem
}
