import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'logo',
  standalone: true,
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input({ required: true }) public src: string
  @Input() public alt: string
  @Input() public title: string
}
