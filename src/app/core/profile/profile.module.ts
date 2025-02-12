import { NgModule } from '@angular/core'
import { NgxsModule } from '@ngxs/store'
import { ProfileStateService } from '@core/profile/state/profile-state.service'

@NgModule({
  imports: [NgxsModule.forFeature([ProfileStateService])]
})
export class ProfileModule {}
