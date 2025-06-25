import { Directive, input } from '@angular/core'
import { classNames } from '@shared/utils/class-names'
import { Size } from '@shared/directives/app-button/button'
import { formInput } from '@shared/directives/form-input/form-input'

@Directive({
  selector: '[appFormInput]',
  standalone: true,
  host: { '[class]': '_class' }
})
export class FormInputDirective {
  public readonly class = input<string>('')
  public readonly size = input<Size>('md')

  protected get _class(): string {
    return classNames(
      formInput({
        size: this.size()
      }),
      this.class
    )
  }
}
