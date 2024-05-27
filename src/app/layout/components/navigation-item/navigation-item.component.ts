import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule, NgClass } from '@angular/common'
import { MenuItem } from '../../types/menu-item'
import { RouterLink, RouterLinkWithHref } from '@angular/router'

@Component({
  selector: 'navigation-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref, NgClass],
  templateUrl: './navigation-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {
  @Input() public item: MenuItem
}
