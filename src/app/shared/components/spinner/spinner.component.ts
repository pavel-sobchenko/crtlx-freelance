import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  host: { class: 'absolute z-10' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {}
