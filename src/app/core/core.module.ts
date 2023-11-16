import { NgModule } from '@angular/core'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'

@NgModule({
  imports: [AuthModule, HttpModule]
})
export class CoreModule {}
