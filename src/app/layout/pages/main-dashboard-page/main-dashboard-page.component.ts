import { ChangeDetectionStrategy, Component, effect } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SideBarComponent } from '../../containers/sidebar/sidebar.component'
import { HeaderComponent } from '../../containers/header/header.component'
import { Store } from '@ngxs/store'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { GetUserProfile } from '@core/auth/state/auth.actions'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'main-dashboard-page',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './main-dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex h-screen bg-gray-50' }
})
export class MainDashboardPageComponent {
  private readonly _isAuthenticatedSignal = toSignal(
    this._store.select(AuthStateSelectors.isAuthenticated)
  )

  constructor(private readonly _store: Store) {
    effect(() => {
      if (this._isAuthenticatedSignal()) {
        this._store.dispatch(new GetUserProfile())
      }
    })
  }
}
