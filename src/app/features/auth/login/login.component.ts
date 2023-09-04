import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { LocalStorageService } from "../../../services/local-storage.service";

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public form = this.fb.group({
    email: ["", {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService) {
  }

  public login(): void {
    if (this.form.invalid) {
      return;
    }

    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          {
            next: (result) => {
              this.localStorage.setToken(result.accessToken);
              this.router.navigate(['/home']);
            },
            error: (error) => {
              // eslint-disable-next-line no-console
              console.log(error)
            }
          }
        );
    }
  }

  public reset(): void {
    this.form.reset();
  }
}
