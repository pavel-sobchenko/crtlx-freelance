import { NgModule } from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { addApiBaseUrlInterceptor } from './interceptors/add-api-base-url.interceptor'
import { addJwtInterceptor } from './interceptors/add-jwt.interceptor'
import { refreshJwtInterceptor } from '@core/http/interceptors/refresh-jwt.interceptor'

@NgModule({
  declarations: [],
  providers: [
    provideHttpClient(
      withInterceptors([
        refreshJwtInterceptor,
        addJwtInterceptor,
        addApiBaseUrlInterceptor
      ])
    )
  ],
  imports: []
})
export class HttpModule {}
