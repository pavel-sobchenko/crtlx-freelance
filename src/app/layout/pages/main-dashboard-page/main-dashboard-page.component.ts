import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { LogoComponent } from '@shared/components/logo/logo.component'
import { SideBarComponent } from '../../containers/sidebar/sidebar.component'
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'main-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent,
    SideBarComponent,
    HeaderComponent
  ],
  templateUrl: './main-dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainDashboardPageComponent {}
