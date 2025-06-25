import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() public url: string
  @Input() public shape: 'round' | 'square' = 'round'
  @Input() public size: 'sm' | 'md' | 'lg' = 'sm'
  @Input() public alt = 'User avatar'
}
