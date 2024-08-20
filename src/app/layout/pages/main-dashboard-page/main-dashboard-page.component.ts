import { ChangeDetectionStrategy, Component, effect } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { SideBarComponent } from '../../containers/sidebar/sidebar.component'
import { HeaderComponent } from '../../containers/header/header.component'
import { Actions, ofActionDispatched, Store } from '@ngxs/store'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { GetUserProfile, LogOut } from '@core/auth/state/auth.actions'
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
  private readonly _authenticated = toSignal(
    this._store.select(AuthStateSelectors.isAuthenticated)
  )

  private readonly _loggedOut = toSignal(
    this._actions$.pipe(ofActionDispatched(LogOut))
  )

  constructor(
    private readonly _store: Store,
    private readonly _actions$: Actions,
    private readonly _router: Router
  ) {
    effect(() => {
      if (!this._authenticated()) return
      this._store.dispatch(new GetUserProfile())
    })

    effect(() => {
      this._loggedOut()
      void this._router.navigate(['auth/login'])
    })
  }
}
