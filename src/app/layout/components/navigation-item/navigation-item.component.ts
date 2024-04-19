import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule, NgClass } from '@angular/common'
import { SideBarItem } from '../../types/side-bar-item'
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router'

@Component({
  selector: 'navigation-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkWithHref,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './navigation-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {
  @Input() public item: SideBarItem
}
