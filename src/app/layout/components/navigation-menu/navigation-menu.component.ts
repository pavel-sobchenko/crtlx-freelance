import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuItem } from '../../types/menu-item'
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router'
import { NavigationItemComponent } from '../navigation-item/navigation-item.component'

@Component({
  selector: 'navigation-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLink,
    RouterLinkActive,
    NavigationItemComponent
  ],
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {
  @Input() public items: MenuItem[]
  @Input() public borderPosition: 'no' | 'top' | 'bottom' = 'no'
}
