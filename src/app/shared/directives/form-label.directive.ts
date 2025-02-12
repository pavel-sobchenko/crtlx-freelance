import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appFormLabel]',
  standalone: true
})
export class FormLabelDirective {
  constructor(elRef: ElementRef) {
    elRef.nativeElement.classList.add('block', 'font-semibold', 'mb-2', 'mt-4')
  }
}
