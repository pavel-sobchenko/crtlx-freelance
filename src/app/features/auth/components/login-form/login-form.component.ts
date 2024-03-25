import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLinkWithHref } from '@angular/router'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { LoginCredentials } from '@core/auth/types/credentials'

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
    ValidationMessageComponent
  ],
  templateUrl: './login-form.component.html',
  host: { class: 'relative' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() public readonly submitForm = new EventEmitter<LoginCredentials>()

  public form: FormGroup = this._fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
    remember: [false]
  })

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _router: Router
  ) {}

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.submitForm.emit(this.form.value as LoginCredentials)
  }
}
