import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import { routes } from './app/app-routing.module'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { jwtInterceptor } from 'src/app/core/features/auth/services/jwt-interceptor.service'
import { errorInterceptorService } from 'src/app/core/features/auth/services/error-interceptor.service'
import { importProvidersFrom } from '@angular/core'
import { NgxsModule } from '@ngxs/store'
import { environment } from 'src/environments/environment.development'
import { AuthState } from 'src/app/core/features/auth/state/auth.state'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'

void bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptorService, jwtInterceptor])
    ),
    importProvidersFrom(
      NgxsModule.forRoot([AuthState], {
        developmentMode: !environment.production
      }),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsLoggerPluginModule.forRoot()
    )
  ]
})
