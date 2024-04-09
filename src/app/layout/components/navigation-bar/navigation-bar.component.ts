import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navigation-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {

}
