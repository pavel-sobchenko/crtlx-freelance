import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app-routing.module";
import { provideHttpClient } from "@angular/common/http";
import { JwtInterceptorProviders } from "@src/app/services/jwt-interceptor.service";

void bootstrapApplication(AppComponent, { providers: [provideRouter(routes), provideHttpClient(), JwtInterceptorProviders] });
