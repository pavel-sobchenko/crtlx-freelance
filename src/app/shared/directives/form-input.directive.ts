import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appFormInput]',
  standalone: true
})
export class FormInputDirective {
  constructor(elRef: ElementRef) {
    elRef.nativeElement.classList.add(
      'shadow',
      'border',
      'border-gray-300',
      'bg-gray-50',
      'rounded-lg',
      'py-2',
      'px-3',
      'text-gray-700',
      'w-full'
    )
  }
}
