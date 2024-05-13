import { InjectionToken } from '@angular/core'

export const COUNTRIES = new InjectionToken<Country[]>('COUNTRIES', {
  factory: () => countries
})

export const countries = [
  { id: 'US', name: 'United States' },
  { id: 'CA', name: 'Canada' },
  { id: 'EN', name: 'England' },
  { id: 'PL', name: 'Poland' },
  { id: 'UKR', name: 'Ukraine' },
  { id: 'GE', name: 'Germany' }
]

type Country = {
  id: string
  name: string
}
