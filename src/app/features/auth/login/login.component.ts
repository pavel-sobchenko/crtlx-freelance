import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../../../core/services/storage.service";
import { Store } from "@ngxs/store";
import { LoginAction, LoginTokenAction } from "@src/app/state/auth.action";
import { Token } from "@src/app/shared/models/token";
import { take } from "rxjs";

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isSubmitted = false;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly localStorage: StorageService,
    private readonly store: Store) {
    this.form = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  public get email(): AbstractControl {
    return this.form.controls['email'];
  }

  public get password(): AbstractControl {
    return this.form.controls['password'];
  }

  public ngOnInit(): void {
    const token = this.localStorage.getToken();
    const parsedToken: Token | null = token ? <Token>JSON.parse(token) : null;
    const isRemember = this.localStorage.getIsRemember();

    this.form.get('rememberMe')?.setValue(isRemember);

    if (isRemember && parsedToken?.accessToken) {
      this.store.dispatch(new LoginTokenAction({ token: parsedToken }))
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    }
  }

  public login(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.email.value && this.password.value) {
      this.store.dispatch(new LoginAction(
        {
          username: this.email.value as string,
          password: this.password.value as string,
          isRemember: this.form.controls['rememberMe'].value as boolean
        }))
        .pipe(take(1))
        .subscribe(() => {
          this.isSubmitted = false;
          this.router.navigate(['/home']);
        });
    }
  }

  public reset(): void {
    this.form.reset();
  }
}
