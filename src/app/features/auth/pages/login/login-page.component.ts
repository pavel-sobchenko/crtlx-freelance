import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Select, Store } from '@ngxs/store'
import { Login, UpdateLoginFormSubmission } from 'src/app/core/auth/state/auth.actions'
import { Credentials } from "../../../../core/auth/types/credentials";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { Observable } from "rxjs";
import { AuthStateSelectors } from "../../../../core/auth/state/auth.selectors";

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  @Select(AuthStateSelectors.isLoginFormSubmitted)
  public isSubmitted$: Observable<boolean>

  constructor(
      private readonly _store: Store
  ) {
  }

  public login(formData: { credentials: Credentials; isRemember: boolean }): void {
    this.markFields(true);
    this._store.dispatch(
        new Login(formData.credentials, formData.isRemember)
    )
  }

  public markFields(isLoginFormSubmitted: boolean): void {
    this._store.dispatch(
        new UpdateLoginFormSubmission(isLoginFormSubmitted)
    )
  }
}
