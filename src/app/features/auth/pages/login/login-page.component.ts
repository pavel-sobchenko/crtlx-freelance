import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Select, Store } from '@ngxs/store'
import { Login } from 'src/app/core/auth/state/auth.actions'
import { LoginFormComponent } from '../../components/login-form/login-form.component'
import { Router } from '@angular/router'
import { firstValueFrom, Observable } from 'rxjs'
import { LoginData } from '../../types/login-data'
import to from 'await-to-js'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { ResponseError } from "@core/auth/types/response-error";
import { AuthStateSelectors } from "@core/auth/state/auth.selectors";

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, SpinnerComponent],
  templateUrl: './login-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  @Select(AuthStateSelectors.isLoading)
  public loading$!: Observable<boolean>

  constructor(
    private readonly _store: Store,
    private readonly _router: Router,
    private readonly _toastr: ToastrService
  ) {}

  public async login(formData: LoginData): Promise<void> {
    const [error] = await to(
      firstValueFrom(
        this._store.dispatch(new Login(formData, formData.remember))
      )
    )

    if (error) {
      const loginError = (error as HttpErrorResponse).error as ResponseError

      this._toastr.error(loginError.message, loginError.error )

      return
    }
    void await this._router.navigate(['/'])
  }
}
