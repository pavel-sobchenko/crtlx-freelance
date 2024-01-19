import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterFormComponent } from '../../components/register-form/register-form.component'
import { Select, Store } from '@ngxs/store'
import { Router } from '@angular/router'
import { firstValueFrom, Observable } from 'rxjs'
import to from 'await-to-js'
import { Register } from '@core/auth/state/auth.actions'
import { Credentials } from '@core/auth/types/credentials'
import { CompanyLogoComponent } from '@shared/components/company-logo/company-logo.component'
import { AuthState } from '@core/auth/state/auth-state.service'
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, CompanyLogoComponent],
  templateUrl: './registration-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  @Select((state: { auth: AuthState }) => state.auth.loading)
  public loading$!: Observable<boolean>

  constructor(
    private readonly _router: Router,
    private readonly _store: Store,
    private readonly _toastr: ToastrService
  ) {}

  public async register(credentials: Credentials): Promise<void> {
    const [signUpErr] = await to(
      firstValueFrom(this._store.dispatch(new Register(credentials)))
    )

    setTimeout(() => {
      if (signUpErr) {
        this._toastr.error('Registration failed!', 'Failed')
        throw new Error('Registration failed')
      }
      this._toastr.success('Registration successful!', 'Success')
      this.goToLogin()
    }, 1000)
  }

  public goToLogin(): void {
    void this._router.navigate(['auth/login'])
  }
}
