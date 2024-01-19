import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'company-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyLogoComponent {}
