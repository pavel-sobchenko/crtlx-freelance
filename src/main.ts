import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import { routes } from './app/app-routing.module'
import { importProvidersFrom } from '@angular/core'
import { NgxsModule } from '@ngxs/store'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { CoreModule } from '@core/core.module'
import { HttpModule } from '@core/http/http.module'
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";

void bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([], {}),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot(),
      CoreModule,
      HttpModule,
    ),
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-center'
    })
  ]
})
