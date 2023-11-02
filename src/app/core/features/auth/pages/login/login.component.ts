import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Select, Store } from '@ngxs/store'
import {
  LoginAction,
  LoginTokenAction,
  UpdateLoginFormSubmission,
  UpdateRememberStatus
} from 'src/app/core/features/auth/state/auth.actions'
import { TokenResponseModel } from 'src/app/core/features/auth/types/token-response.model'
import { Observable } from 'rxjs'
import { REMEMBER, TOKEN } from 'src/app/core/features/auth/auth.constants.'
import { AuthSelectors } from '../../state/auth.selectors'

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  @Select(AuthSelectors.isLoginFormSubmitted)
  public isSubmitted$: Observable<boolean>
  @Select(AuthSelectors.isRemember) public isRemember: Observable<boolean>
  public form: FormGroup = this._fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email]
      }
    ],
    password: [
      '',
      {
        validators: [Validators.required, Validators.minLength(6)]
      }
    ],
    rememberMe: [false]
  })

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _router: Router,
    private readonly _store: Store
  ) {
    this.form
      .get('rememberMe')
      ?.valueChanges.subscribe(
      {
        next: (value: boolean) => this._store.dispatch(new UpdateRememberStatus({ isRemember: value }))
      }
    )
  }

  public get email(): AbstractControl {
    return this.form.controls['email']
  }

  public get password(): AbstractControl {
    return this.form.controls['password']
  }

  public get rememberMe(): AbstractControl {
    return this.form.controls['rememberMe']
  }

  public ngOnInit(): void {
    const isRemember = window.localStorage.getItem(REMEMBER)
    if (!isRemember) return
    this.rememberMe.setValue(isRemember)

    const token = window.localStorage.getItem(TOKEN)
    if (!token) return

    const parsedToken = JSON.parse(token) as TokenResponseModel
    this._store.dispatch(new LoginTokenAction({ token: parsedToken }))
  }

  public login(): void {
    this._store.dispatch(
      new UpdateLoginFormSubmission({ isLoginFormSubmitted: true })
    )
    if (this.form.invalid) return

    this._store.dispatch(
      new LoginAction({
        username: this.email.value as string,
        password: this.password.value as string
      })
    )
  }
}
