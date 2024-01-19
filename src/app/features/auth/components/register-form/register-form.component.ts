import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { errors } from '../../constants/errors'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'
import { Credentials } from '@core/auth/types/credentials'
import { emailValidator } from '@core/auth/validators/emailValidator'
import { AuthService } from '@core/auth/services/auth.service'

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register-form.component.html',
  host: { class: 'relative' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Input() public loading = false
  @Output() public readonly register = new EventEmitter<Credentials>()
  @Output() public readonly returnToSignIn = new EventEmitter<void>()
  public formErrors = errors
  public isPasswordVisible = false
  public form: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [Validators.required],
      [emailValidator(this._authService)],
      { updateOn: 'blur' }
    ],
    password: ['', [Validators.required]]
  })

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _authService: AuthService
  ) {}

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.register.emit(this.form.value as Credentials)
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible
  }
}
