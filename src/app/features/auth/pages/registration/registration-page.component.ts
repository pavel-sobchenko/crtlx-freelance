import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterFormComponent } from '../../components/register-form/register-form.component'
import { Select, Store } from '@ngxs/store'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, firstValueFrom, Observable } from 'rxjs'
import to from 'await-to-js'
import { Register } from '@core/auth/state/auth.actions'
import { Credentials } from '@core/auth/types/credentials'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { ErrorResponse } from '@core/auth/types/error-response'

@Component({
  selector: 'registration',
  standalone: true,
  imports: [
    CommonModule,
    RegisterFormComponent,
    SpinnerComponent,
    LogoComponent
  ],
  templateUrl: './registration-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  @Select(AuthStateSelectors.loading)
  public loading$!: Observable<boolean>

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store,
    private readonly _toastr: ToastrService
  ) {}

  public async register(credentials: Credentials): Promise<void> {
    const [error] = await to<Register, HttpErrorResponse>(
      firstValueFrom(
        this._store
          .dispatch(new Register(credentials))
          .pipe(catchError((e: HttpErrorResponse) => Promise.reject(e)))
      )
    )

    if (error) {
      const registerError = error.error as ErrorResponse

      this._toastr.error(registerError.message, registerError.error)

      return
    }
    this._toastr.success('Registration successful!', 'Success')
    await this._router.navigate(['/auth/login'], {
      relativeTo: this._route.parent
    })
  }
}
