import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { User } from '@core/auth/types/user'
import { initFlowbite } from 'flowbite'

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements AfterViewInit {
  @Input() public user: User

  public ngAfterViewInit(): void {
    initFlowbite()
  }
}
