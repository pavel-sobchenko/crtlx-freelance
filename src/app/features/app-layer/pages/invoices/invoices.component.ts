import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent {}
