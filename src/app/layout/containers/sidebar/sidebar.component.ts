import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { Store } from '@ngxs/store'
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, LogoComponent, RouterLinkWithHref, RouterLinkActive, NavigationBarComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}
}
