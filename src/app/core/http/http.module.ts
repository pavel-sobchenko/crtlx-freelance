import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { addApiBaseUrlInterceptor } from "./interceptors/add-api-base-url.interceptor";


@NgModule({
  declarations: [],
  providers: [provideHttpClient(withInterceptors([addApiBaseUrlInterceptor]))],
  imports: [
    CommonModule
  ]
})
export class HttpModule {
}
