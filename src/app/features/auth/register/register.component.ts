import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@src/app/features/auth/services/auth.service";
import { take } from "rxjs";
import { UniqueEmailValidatorService } from "@src/app/core/services/unique-email-validator.service";
import { Store } from "@ngxs/store";
import { RegisterAction } from "@src/app/state/auth.action";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public form: FormGroup;
  public isSubmitted = false;
  public isPasswordVisible = false;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly uniqueEmailValidator: UniqueEmailValidatorService,
    private readonly store: Store) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
      }],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public get email(): AbstractControl {
    return this.form.controls['email'];
  }

  public get password(): AbstractControl {
    return this.form.controls['password'];
  }

  public get name(): AbstractControl {
    return this.form.controls['name'];
  }

  public register(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.isSubmitted = false;
      this.store.dispatch(new RegisterAction({
        name: this.name.value as string,
        email: this.email.value as string,
        password: this.password.value as string
      }))
        .pipe(take(1))
        .subscribe(() => {
          this.isSubmitted = false;
          this.router.navigate(['/login']);
        });
    }
  }

  public returnToSignIn(): void {
    this.router.navigate(['/login']);
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
