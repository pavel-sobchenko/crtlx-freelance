import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { Store } from '@ngxs/store'
import { LogOut } from '@core/auth/state/auth.actions'

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, LogoComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._store.dispatch(new LogOut())
    void this._router.navigate(['/auth/login'])
  }
}
