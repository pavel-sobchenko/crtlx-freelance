import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Credentials } from '@core/auth/types/credentials'
import { emailUniqueValidator } from '@core/auth/validators/emailUniqueValidator'
import { AuthService } from '@core/auth/services/auth.service'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './register-form.component.html',
  host: { class: 'relative' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Output() public readonly register = new EventEmitter<Credentials>()
  public isPasswordVisible = false
  public form: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, Validators.email],
      [emailUniqueValidator(this._authService)],
      { updateOn: 'blur' }
    ],
    password: ['', [Validators.required]]
  })

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {}

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.register.emit(this.form.value as Credentials)
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  public navigate(e: MouseEvent): void {
    e.preventDefault()
    void this._router.navigate(['/auth/login'], { relativeTo: this._route.parent })

  }
}
