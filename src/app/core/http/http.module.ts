import { NgModule } from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { addApiBaseUrlInterceptor } from './interceptors/add-api-base-url.interceptor'
import { addJwtInterceptor } from './interceptors/add-jwt-interceptor.service'

@NgModule({
  declarations: [],
  providers: [
    provideHttpClient(
      withInterceptors([addJwtInterceptor, addApiBaseUrlInterceptor])
    )
  ],
  imports: []
})
export class HttpModule {}
