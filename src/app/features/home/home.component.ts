import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngxs/store'
import { LogOut } from 'src/app/core/auth/state/auth.actions'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._store.dispatch(new LogOut())
    void this._router.navigate(['/auth/login'])
  }
}
