import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SideBarItem } from '../../types/side-bar-item'
import { SIDEBAR_ITEMS } from '../../constants/sidebar-items'
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router'
import { NavigationItemComponent } from '../navigation-item/navigation-item.component'

@Component({
  selector: 'navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLink,
    RouterLinkActive,
    NavigationItemComponent
  ],
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {
  constructor(
    @Inject(SIDEBAR_ITEMS)
    public readonly navigationBarItems: SideBarItem[]
  ) {}
}
