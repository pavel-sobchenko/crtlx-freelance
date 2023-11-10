import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginData } from "../../types/login-data";

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  @Input() public submitted: boolean | null;
  @Output() public readonly submitEmitter = new EventEmitter<LoginData>();
  @Output() public readonly markFieldsEmitter = new EventEmitter<boolean>();
  @Output() public readonly rememberMeEmitter = new EventEmitter<boolean>();

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
    this.rememberMe.valueChanges.subscribe((value: boolean) => {
      this.rememberMeEmitter.emit(value);
    });
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
      this.markFieldsEmitter.emit(true);
      return;
    }

    this.submitEmitter.emit({ username: this.email.value as string, password: this.password.value as string });
  }
}
