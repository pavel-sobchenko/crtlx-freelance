import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GetUserInfo, LogOut } from '@core/auth/state/auth.actions'
import { Store } from '@ngxs/store'
import { Router } from '@angular/router'
import { AvatarComponent } from '@shared/components/avatar/avatar.component'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'header-info',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  _store = inject(Store)
  _router = inject(Router)
  user$ = this._store.select(state => state.auth.user)
  userSignal = toSignal(this.user$)

  logout() {
    this._store.dispatch(new LogOut())
    this._router.navigate(['auth/login'])
  }

  ngOnInit(): void {
    if (!this.userSignal()) {
      this._store.dispatch(new GetUserInfo())
    }
  }
}
