import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'clients-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsPageComponent {}
