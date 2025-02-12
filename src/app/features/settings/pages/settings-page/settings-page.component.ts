import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Select, Store } from '@ngxs/store'
import { firstValueFrom, Observable } from 'rxjs'
import { User } from '@core/auth/types/user'
import { SettingsFormComponent } from '../../components/settings-form/settings-form.component'
import to from 'await-to-js'
import { HttpErrorResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { ErrorResponse } from '@core/types/error-response'
import { ProfileStateSelectors } from '@core/profile/state/profile.selectors'
import { UpdateUserProfile } from '@core/profile/state/profile.actions'

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SettingsFormComponent],
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  @Select(ProfileStateSelectors.user)
  public readonly user$!: Observable<User>

  private readonly _store = inject(Store)
  private readonly _toastr = inject(ToastrService)

  public async saveUserSettings(userData: FormData): Promise<void> {
    const [error] = await to<unknown, HttpErrorResponse>(
      firstValueFrom(this._store.dispatch(new UpdateUserProfile(userData)))
    )

    if (!error) return

    const updateError = error.error as ErrorResponse

    this._toastr.error(updateError.message, updateError.error)
  }
}
