import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { User } from '@core/auth/types/user'

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() user: User
}
