import { AfterViewInit, ChangeDetectionStrategy, Component, input } from '@angular/core'
import { AvatarComponent } from '@shared/components/avatar/avatar.component'
import { User } from '@core/auth/types/user'

import { initFlowbite } from 'flowbite'

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements AfterViewInit {
  public user = input<User>()

  public ngAfterViewInit(): void {
    initFlowbite()
  }
}
