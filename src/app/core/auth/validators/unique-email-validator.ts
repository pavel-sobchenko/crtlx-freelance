import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms'
import { catchError, delay, Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AuthService } from '@core/auth/services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorResponse } from '@shared/types/error-response'

export function uniqueEmailValidator(
  authService: AuthService
): AsyncValidatorFn {
  return (
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null)

    return of(control.value).pipe(
      delay(500),
      switchMap(() => authService.validateEmail(control.value)),
      catchError((error: HttpErrorResponse) => {
        const message = (error.error as ErrorResponse).message

        return of({ alreadyExist: message })
      })
    )
  }
}
