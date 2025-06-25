import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function fileExtensionValidator(accept: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File

    if (!file) return null

    const fileName = file?.name || String(file)
    const extension = fileName?.split('.').pop()?.toLowerCase()
    const valid = accept
      .map(ext => ext.replace('.', '').toLowerCase())
      .includes(extension ?? '')

    return valid ? null : { invalidFileExtension: true }
  }
}
