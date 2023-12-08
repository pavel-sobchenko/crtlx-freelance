import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Credentials } from "../../../../core/auth/types/credentials";

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  @Input() public submitted: boolean | null;
  @Output() public readonly submitEmitter = new EventEmitter<{ credentials: Credentials; isRemember: boolean }>();
  @Output() public readonly markFieldsSubmittedEmitter = new EventEmitter<boolean>();

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

  constructor(private readonly _fb: NonNullableFormBuilder) {
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

  public submit(): void {
    if (this.form.invalid) {
      this.markFieldsSubmittedEmitter.emit(true);
      return;
    }

    this.submitEmitter.emit({
      credentials:
          {
            email: this.email.value as string,
            password: this.password.value as string
          },
      isRemember: this.rememberMe.value as boolean
    });
  }
}
