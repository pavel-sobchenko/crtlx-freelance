import { ChangeDetectionStrategy, Component } from '@angular/core'

import { RegisterFormComponent } from '../../components/register-form/register-form.component'
import { Store } from '@ngxs/store'
import { ActivatedRoute, Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import to from 'await-to-js'
import { Register } from '@core/auth/state/auth.actions'
import { Credentials } from '@core/auth/types/credentials'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { ErrorResponse } from '@core/types/error-response'

@Component({
  selector: 'registration',
  standalone: true,
  imports: [RegisterFormComponent, SpinnerComponent, LogoComponent],
  templateUrl: './registration-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store,
    private readonly _toastr: ToastrService
  ) {}

  public async register(credentials: Credentials): Promise<void> {
    const [error] = await to<unknown, HttpErrorResponse>(
      firstValueFrom(this._store.dispatch(new Register(credentials)))
    )

    if (error) {
      const registerError = error.error as ErrorResponse

      this._toastr.error(registerError.message, registerError.error)

      return
    }
    this._toastr.success('Registration successful!', 'Success')

    void this._router.navigate(['/auth/login'])
  }
}
