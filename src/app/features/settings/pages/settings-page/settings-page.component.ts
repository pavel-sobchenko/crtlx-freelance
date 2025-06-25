import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngxs/store'
import { firstValueFrom } from 'rxjs'
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
  host: { class: 'flex flex-col px-8 py-4' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  public readonly user$ = this._store.select(ProfileStateSelectors.user)
  constructor(
    private readonly _store: Store,
    private readonly _toastr: ToastrService
  ) {}

  public async saveUserSettings(userData: FormData): Promise<void> {
    const [error] = await to<unknown, HttpErrorResponse>(
      firstValueFrom(this._store.dispatch(new UpdateUserProfile(userData)))
    )

    if (!error) return

    const updateError = error.error as ErrorResponse

    this._toastr.error(updateError.message, updateError.error)
  }
}
