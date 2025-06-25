import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function classNames(...input: ClassValue[]): string {
  return twMerge(clsx(input))
}
