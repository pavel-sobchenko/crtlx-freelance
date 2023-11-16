import { NgModule } from '@angular/core'
import { NgxsModule } from '@ngxs/store'
import { provideTokensRestorer } from './providers/provide-tokens-resporer.provider'
import { AuthStateService } from './state/auth.state.service'

@NgModule({
  imports: [NgxsModule.forFeature([AuthStateService])],
  providers: [provideTokensRestorer()]
})
export class AuthModule {}
