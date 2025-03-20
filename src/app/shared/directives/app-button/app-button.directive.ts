import { Directive, input } from '@angular/core'
import { classNames } from '@shared/utils/class-names'
import { button, Intent, Shape, Size } from '@shared/directives/app-button/button'

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: { '[class]': '_class' }
})
export class AppButtonDirective {
  public readonly class = input<string>('')
  public readonly intent = input<Intent>('primary')
  public readonly size = input<Size>('md')
  public readonly shape = input<Shape>('rounded')

  protected get _class(): string {
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
