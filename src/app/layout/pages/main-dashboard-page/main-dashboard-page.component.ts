import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SideBarComponent } from '../../containers/sidebar/sidebar.component'
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'main-dashboard-page',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './main-dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex h-screen bg-gray-50' }
})
export class MainDashboardPageComponent {}
