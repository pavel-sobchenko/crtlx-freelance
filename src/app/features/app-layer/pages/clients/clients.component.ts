import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {}
