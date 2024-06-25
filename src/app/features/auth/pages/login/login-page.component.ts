import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngxs/store'
import { Login } from 'src/app/core/auth/state/auth.actions'
import { LoginFormComponent } from '../../components/login-form/login-form.component'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import to from 'await-to-js'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { LoginCredentials } from '@core/auth/types/credentials'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { ErrorResponse } from '@core/shared/types/error-response'

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, SpinnerComponent, LogoComponent],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  constructor(
    private readonly _store: Store,
    private readonly _router: Router,
    private readonly _toastr: ToastrService
  ) {}

  public async login(formData: LoginCredentials): Promise<void> {
    const [error] = await to<unknown, HttpErrorResponse>(
      firstValueFrom(this._store.dispatch(new Login(formData)))
    )

    if (!error) {
      return void this._router.navigate(['/'])
    }

    const loginError = error.error as ErrorResponse

    this._toastr.error(loginError.message, loginError.error)
  }
}
