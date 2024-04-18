import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '@core/auth/services/auth.service'

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  service = inject(AuthService)
  test() {
    this.service.getProfile().subscribe(data => {
      console.log(data)
    })
  }
}
