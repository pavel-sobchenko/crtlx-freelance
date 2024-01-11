import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterFormComponent } from '../../components/register-form/register-form.component'
import { Select, Store } from '@ngxs/store'
import { Router } from '@angular/router'
import { AuthState } from '@core/auth/state/auth-state.service'
import { firstValueFrom, Observable } from 'rxjs'
import { RegisterData } from '@core/auth/types/credentials'
import to from 'await-to-js'
import {
  Register,
  SetIsLoading,
  ValidateEmail
} from '@core/auth/state/auth.actions'

@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './registration-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  @Select((state: { auth: AuthState }) => state.auth.loading)
  public loading$!: Observable<boolean>
  @Select((state: { auth: AuthState }) => state.auth.validationEmailError)
  public validationEmailError$!: Observable<string | null>
  constructor(
    private readonly _router: Router,
    private readonly _store: Store
  ) {}

  public async register(userData: RegisterData): Promise<void> {
    const [err] = await to(
      firstValueFrom(this._store.dispatch(new ValidateEmail(userData.email)))
    )
    if (err) return

    const [signUpErr] = await to(
      firstValueFrom(this._store.dispatch(new Register(userData)))
    )
    setTimeout(() => {
      this._store.dispatch(new SetIsLoading(false))
      if (signUpErr) {
        throw new Error('Registration failed')
      }
      this.goToSignIn()
    }, 1000)
  }

  public goToSignIn(): void {
    void this._router.navigate(['auth/login'])
  }
}
