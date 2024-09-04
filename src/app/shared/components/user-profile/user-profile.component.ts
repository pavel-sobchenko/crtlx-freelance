import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core'
import { AvatarComponent } from '@shared/components/avatar/avatar.component'
import { User } from '@core/auth/types/user'
import { NgIf } from '@angular/common'
import { initFlowbite } from 'flowbite'

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [AvatarComponent, NgIf],
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements AfterViewInit {
  @Input() public user: User

  public ngAfterViewInit(): void {
    initFlowbite()
  }
}
