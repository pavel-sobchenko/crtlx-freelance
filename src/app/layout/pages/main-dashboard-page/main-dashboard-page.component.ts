import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { NavigationPanelComponent } from '../../containers/navigation-panel/navigation-panel.component'

@Component({
  selector: 'main-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent,
    NavigationPanelComponent
  ],
  templateUrl: './main-dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainDashboardPageComponent {}
