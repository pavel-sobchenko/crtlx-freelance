import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import { routes } from './app/app-routing.module'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { jwtInterceptor } from 'src/app/core/auth/interceptors/jwt-interceptor.service'
import { importProvidersFrom } from '@angular/core'
import { NgxsModule } from '@ngxs/store'
import { environment } from 'src/environments/environment.development'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { CoreModule } from "./app/core/core.module";

void bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
        withInterceptors([jwtInterceptor])
    ),
    importProvidersFrom(
        NgxsModule.forRoot([], {
          developmentMode: !environment.production
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        CoreModule
    )
  ]
})
