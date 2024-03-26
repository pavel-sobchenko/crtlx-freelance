import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input({ required: true }) public src: string
  @Input() public alt: string
  @Input() public title: string
}
