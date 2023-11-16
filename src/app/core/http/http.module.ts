import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { addApiBaseUrl } from './interceptors/add-api-base-url.interceptor'

@NgModule({
  providers: [provideHttpClient(withInterceptors([addApiBaseUrl]))]
})
export class HttpModule {}
