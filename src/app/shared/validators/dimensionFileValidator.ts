import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms'
import { Observable, of } from 'rxjs'

export function dimensionFileValidator(dimension: {
  width: number
  height: number
}): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null)

    const file = control.value as File
    const image = new Image()

    image.src = URL.createObjectURL(file)

    const reader = new FileReader()

    reader.readAsDataURL(file)

    return new Observable(observer => {
      image.onload = () => {
        if (image.width > dimension.width || image.height > dimension.height) {
          observer.next({ dimensionError: true })
        } else {
          observer.next(null)
        }
        observer.complete()
      }

      image.onerror = () => {
        observer.next({ dimensionError: true })
        observer.complete()
      }
    })
  }
}
