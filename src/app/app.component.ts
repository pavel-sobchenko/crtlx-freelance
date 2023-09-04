import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoginComponent } from "./features/auth/login/login.component";
import { HomeComponent } from "@src/app/features/home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent, HomeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = 'crtlx-freelance';
}
