import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoginComponent } from "./features/auth/login/login.component";
import { HomeComponent } from "@src/app/features/home/home.component";
import { SpinnerComponent } from "@src/app/shared/components/spinner/spinner.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoginComponent, HomeComponent, SpinnerComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
