import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ERRORS } from '../../../features/auth/constants/errors'
import { ValidationErrors } from '@angular/forms'

@Component({
  selector: 'validation-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-message.component.html',
  host: { class: 'text-red-500 text-sm mt-1' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {
  @Input() public errors: ValidationErrors

  public error: string

  constructor(
    @Inject(ERRORS)
    public readonly errorMessages: Record<string, string>
  ) {}
}
