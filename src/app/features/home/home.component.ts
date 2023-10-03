import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from "@ngxs/store";
import { LoginOutAction } from "@src/app/state/auth.action";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(private readonly store: Store) {
  }

  public logout(): void {
    this.store.dispatch(new LoginOutAction());
  }
}
