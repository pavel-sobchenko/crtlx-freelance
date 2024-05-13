import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Select, Store } from '@ngxs/store'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { firstValueFrom, Observable } from 'rxjs'
import { User } from '@core/auth/types/user'
import { SettingsFormComponent } from '../../components/settings-form/settings-form.component'
import to from 'await-to-js'
import { HttpErrorResponse } from '@angular/common/http'
import { UpdateUserInfo } from '@core/auth/state/auth.actions'
import { ToastrService } from 'ngx-toastr'
import { ErrorResponse } from '@core/shared/types/error-response'

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SettingsFormComponent],
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  private readonly _store = inject(Store)
  private readonly _toastr = inject(ToastrService)
  @Select(AuthStateSelectors.user)
  public user$!: Observable<User>

  public async saveUserSettings(userData: FormData): Promise<void> {
    const [error] = await to<unknown, HttpErrorResponse>(
      firstValueFrom(this._store.dispatch(new UpdateUserInfo(userData)))
    )

    if (error) {
      const loginError = error.error as ErrorResponse

      this._toastr.error(loginError.message, loginError.error)
    }
  }
}
