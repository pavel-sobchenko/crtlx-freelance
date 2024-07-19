import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {}
