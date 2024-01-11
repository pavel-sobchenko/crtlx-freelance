import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { errors } from '../../constants/errors'
import { RegisterData } from '@core/auth/types/credentials'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Input() public loading = false
  @Input() public validationEmailError: string | null = null
  @Output() public register = new EventEmitter<RegisterData>()
  @Output() public returnToSignIn = new EventEmitter<void>()
  public formErrors = errors
  public form: FormGroup
  public isPasswordVisible = false

  constructor(private readonly _fb: NonNullableFormBuilder) {
    this.form = this._fb.group({
      name: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }]
    })

    this.form.controls['email'].valueChanges.subscribe(() => {
      this.validationEmailError = null
    })
  }

  public registerUser(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.register.emit({
      name: this.form.controls['name'].value as string,
      email: this.form.controls['email'].value as string,
      password: this.form.controls['password'].value as string
    })
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible
  }
}
