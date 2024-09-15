import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col items-center' }
})
export class PageNotFoundComponent {}
