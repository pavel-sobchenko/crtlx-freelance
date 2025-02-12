import { NgModule } from '@angular/core'
import { HttpModule } from './http/http.module'
import { AuthModule } from './auth/auth.module'
import { ProfileModule } from '@core/profile/profile.module'

@NgModule({
  imports: [AuthModule, ProfileModule, HttpModule]
})
export class CoreModule {}
