import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoginData } from '../../types/login-data'
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLinkWithHref, ValidationMessageComponent],
  templateUrl: './login-form.component.html',
  host: { class: 'relative' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() public readonly submitForm = new EventEmitter<LoginData>()

  public form: FormGroup = this._fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
    remember: [false]
  })

  constructor(
      private readonly _fb: NonNullableFormBuilder,
      private readonly _router: Router,
      private readonly _route: ActivatedRoute,
  ) {
  }

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.submitForm.emit(this.form.value as LoginData)
  }

  public navigate(e: MouseEvent): void {
    e.preventDefault();
    void this._router.navigate(['/auth/register'], { relativeTo: this._route.parent })
  }
}
