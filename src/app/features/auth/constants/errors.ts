import { InjectionToken } from '@angular/core'

export const ERRORS = new InjectionToken<Record<string, string>>('ERRORS', {
  factory: () => errors
})

export const errors: Record<string, string> = {
  required: 'Field is required',
  email: 'Field should be in email format'
}
