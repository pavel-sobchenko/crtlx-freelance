import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginFormComponent } from '../../components/login-form/login-form.component'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { Select } from '@ngxs/store'
import { AuthStateSelectors } from '@core/auth/state/auth.selectors'
import { Observable } from 'rxjs'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'auth-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginFormComponent,
    SpinnerComponent,
    LogoComponent,
    RouterOutlet
  ],
  templateUrl: './auth-page.component.html',
  host: { class: 'flex justify-center items-center h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {
  @Select(AuthStateSelectors.loading)
  public loading$!: Observable<boolean>
}
