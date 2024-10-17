import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function requiredFileTypeValidator(
  allowedExtensions: string[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    const file = control.value as File
    const extension = file.name.split('.').pop().toLowerCase()

    if (!allowedExtensions.includes(extension)) {
      return { requiredFileType: true }
    }

    return null
  }
}
