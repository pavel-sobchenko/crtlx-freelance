import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'invoices-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesPageComponent {}
