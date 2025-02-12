import { Directive, input } from '@angular/core'
import { classNames } from '@shared/utils/class-names'
import { button, Intent, Shape, Size } from '@shared/utils/button'

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: { '[class]': '_class' }
})
export class AppButtonDirective {
  readonly class = input<string>('')
  readonly intent = input<Intent>('primary')
  readonly size = input<Size>('md')
  readonly shape = input<Shape>('rounded')

  constructor() {}

  get _class(): string {
    return classNames(
      button({
        intent: this.intent(),
        size: this.size(),
        shape: this.shape()
      }),
      this.class
    )
  }
}
