import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterFormComponent } from '../../components/register-form/register-form.component'
import { Select, Store } from '@ngxs/store'
import { ActivatedRoute, Router } from '@angular/router'
import { firstValueFrom, Observable } from 'rxjs'
import to from 'await-to-js'
import { Register } from '@core/auth/state/auth.actions'
import { Credentials } from '@core/auth/types/credentials'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'
import { ResponseError } from "@core/auth/types/response-error";
import { AuthStateSelectors } from "@core/auth/state/auth.selectors";

@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, SpinnerComponent],
  templateUrl: './registration-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
    @Select(AuthStateSelectors.isLoading)
    public loading$!: Observable<boolean>

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store,
    private readonly _toastr: ToastrService
  ) {}

  public async register(credentials: Credentials): Promise<void> {
    const [error] = await to(
      firstValueFrom(this._store.dispatch(new Register(credentials)))
    )

    if (error) {
      const registerError = (error as HttpErrorResponse).error as ResponseError

      this._toastr.error(registerError.message, registerError.error )

      return
    }
    this._toastr.success('Registration successful!', 'Success')
    void await this._router.navigate(['/auth/login'], { relativeTo: this._route.parent })
  }
}
