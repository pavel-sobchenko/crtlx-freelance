import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Select, Store } from '@ngxs/store'
import {
  InitAuthStateAction,
  LoginAction,
  UpdateLoginFormSubmission,
  UpdateRememberStatus
} from 'src/app/core/features/auth/state/auth.actions'
import { Observable } from 'rxjs'
import { AuthSelectors } from '../../state/auth.selectors'
import { LoginData } from "../../types/login-data";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  @Select(AuthSelectors.isLoginFormSubmitted)
  public isSubmitted$: Observable<boolean>
  @Select(AuthSelectors.isRemember) public isRemember: Observable<boolean>

  constructor(
      private readonly _store: Store
  ) {
  }

  public ngOnInit(): void {
    this._store.dispatch(new InitAuthStateAction());
  }

  public login(loginData: LoginData): void {
    this.markFields(true);
    this._store.dispatch(
        new LoginAction({
          username: loginData.username,
          password: loginData.password
        })
    )
  }

  public markFields(isLoginFormSubmitted: boolean): void {
    this._store.dispatch(
        new UpdateLoginFormSubmission({ isLoginFormSubmitted })
    )
  }

  public rememberMe(isRemember: boolean): void {
    this._store.dispatch(new UpdateRememberStatus({ isRemember }))
  }
}
