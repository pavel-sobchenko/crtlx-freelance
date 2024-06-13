import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { User } from '@core/auth/types/user'

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() public user: User
}
