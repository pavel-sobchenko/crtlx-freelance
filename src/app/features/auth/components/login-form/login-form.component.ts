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
import { LoginData } from '../../types/login-data'
import { SpinnerComponent } from '@shared/components/spinner/spinner.component'

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Input() public loading = false
  @Output() public readonly submitForm = new EventEmitter<LoginData>()
  public formErrors = errors

  public form: FormGroup = this._fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
    remember: [false]
  })

  constructor(private readonly _fb: NonNullableFormBuilder) {}

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.submitForm.emit({
      credentials: {
        email: this.form.controls['email'].value as string,
        password: this.form.controls['password'].value as string
      },
      remember: this.form.controls['remember'].value as boolean
    })
  }
}
