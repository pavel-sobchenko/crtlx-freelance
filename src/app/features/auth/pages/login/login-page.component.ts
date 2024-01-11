import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Select, Store } from '@ngxs/store'
import { Login, SetIsLoading } from 'src/app/core/auth/state/auth.actions'
import { LoginFormComponent } from '../../components/login-form/login-form.component'
import { Router } from '@angular/router'
import { firstValueFrom, Observable } from 'rxjs'
import { LoginData } from '../../types/login-data'
import to from 'await-to-js'
import { AuthState } from '@core/auth/state/auth-state.service'

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  @Select((state: { auth: AuthState }) => state.auth.loading)
  public loading$!: Observable<boolean>
  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}

  public async login(formData: LoginData): Promise<void> {
    const [err] = await to(
      firstValueFrom(
        this._store.dispatch(new Login(formData.credentials, formData.remember))
      )
    )

    setTimeout(() => {
      this._store.dispatch(new SetIsLoading(false))
      if (err) {
        throw new Error('Login failed')
      }
      void this._router.navigate(['/'])
    }, 1000)
  }

  public goToCreateAccount(): void {
    void this._router.navigate(['auth/register'])
  }
}
