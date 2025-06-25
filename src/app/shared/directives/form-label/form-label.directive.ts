import { Directive, input } from '@angular/core'
import { classNames } from '@shared/utils/class-names'
import { Size } from '@shared/directives/app-button/button'
import { formLabel } from '@shared/directives/form-label/form-label'

@Directive({
  selector: '[appFormLabel]',
  standalone: true,
  host: { '[class]': '_class' }
})
export class FormLabelDirective {
  public readonly class = input<string>('')
  public readonly size = input<Size>('md')

  protected get _class(): string {
    return classNames(
      formLabel({
        size: this.size()
      }),
      this.class
    )
  }
}
