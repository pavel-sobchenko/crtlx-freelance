import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LogOut } from '@core/auth/state/auth.actions'
import { Store } from '@ngxs/store'
import { Router } from '@angular/router'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { UserProfileComponent } from '@shared/components/user-profile/user-profile.component'

@Component({
  selector: 'header-info, [header-info]',
  exportAs: 'appHeader',
  standalone: true,
  imports: [CommonModule, UserProfileComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-10 flex justify-end m-4 items-center' }
})
export class HeaderComponent {
  public user$ = this._store.select(AuthStateSelectors.user)

  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._store.dispatch(new LogOut())
    void this._router.navigate(['auth/login'])
  }
}
