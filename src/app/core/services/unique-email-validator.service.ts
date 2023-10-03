import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { AuthService } from "@src/app/features/auth/services/auth.service";
import { catchError, debounceTime, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniqueEmailValidatorService implements AsyncValidator {

  constructor(private readonly authService: AuthService) {
  }

  public validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.checkEmail(control.value + '')
      .pipe(
        debounceTime(500),
        map((email: boolean) => !email ? null : { email }),
        catchError((err) => {
          return of({ isUnique: (err as string).split('Message:')[1] });
        }));
  }
}
