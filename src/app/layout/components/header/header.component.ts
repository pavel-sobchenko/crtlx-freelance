import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GetUserInfo, LogOut } from '@core/auth/state/auth.actions'
import { Store } from '@ngxs/store'
import { Router } from '@angular/router'
import { AvatarComponent } from '@shared/components/avatar/avatar.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'

@Component({
  selector: 'header-info',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public _store = inject(Store)
  public user$ = this._store.select(AuthStateSelectors.user)
  public userSignal = toSignal(this.user$)

  private readonly _router = inject(Router)

  public logout(): void {
    this._store.dispatch(new LogOut())
    void this._router.navigate(['auth/login'])
  }

  public ngOnInit(): void {
    if (!this.userSignal()) {
      this._store.dispatch(new GetUserInfo())
    }
  }
}
