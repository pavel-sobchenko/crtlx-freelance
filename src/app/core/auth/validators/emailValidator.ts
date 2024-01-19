import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms'
import { catchError, delay, map, Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AuthService } from '@core/auth/services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'

export function emailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null)
    }

    return of(control.value).pipe(
      delay(500),
      switchMap(() => authService.validateEmail(control.value as string)),
      map(() => null as ValidationErrors),
      catchError((err: HttpErrorResponse) => {
        const message = (err.error as ErrorEvent).message

        return of({ validation: { message } })
      })
    )
  }
}
