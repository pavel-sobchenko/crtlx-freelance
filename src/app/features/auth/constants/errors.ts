import { InjectionToken } from "@angular/core";

export const ERROR_VALIDATION = new InjectionToken<Record<string, string>>('Error validation', {
    factory: () => errors
})

export const errors: Record<string, string> = {
  required: 'Field is required',
  email: 'Field should be in email format'
}
