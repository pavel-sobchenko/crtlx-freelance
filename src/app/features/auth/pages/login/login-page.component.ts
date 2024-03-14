import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Select, Store } from '@ngxs/store'
import { Login } from 'src/app/core/auth/state/auth.actions'
import { LoginFormComponent } from '../../components/login-form/login-form.component'
import { Router } from '@angular/router'
import { catchError, firstValueFrom, Observable } from 'rxjs'
import to from 'await-to-js'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { LoginCredentials } from '@core/auth/types/credentials'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { ErrorResponse } from '@core/auth/types/error-response'

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, SpinnerComponent, LogoComponent],
  templateUrl: './login-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  @Select(AuthStateSelectors.loading)
  public loading$!: Observable<boolean>

  constructor(
    private readonly _store: Store,
    private readonly _router: Router,
    private readonly _toastr: ToastrService
  ) {}

  public async login(formData: LoginCredentials): Promise<void> {
    const [error] = await to<Login, HttpErrorResponse>(
      firstValueFrom<Login>(
        this._store
          .dispatch(new Login(formData))
          .pipe(catchError((e: HttpErrorResponse) => Promise.reject(e)))
      )
    )

    if (error) {
      const loginError = error.error as ErrorResponse

      this._toastr.error(loginError.message, loginError.error)

      return
    }

    await this._router.navigate(['/'])
  }
}
