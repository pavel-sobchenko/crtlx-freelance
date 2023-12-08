import { NgModule } from "@angular/core";
import { provideTokensRestorer } from "./providers/provide-tokens-restorer.provider";
import { NgxsModule } from "@ngxs/store";
import { AuthStateService } from "./state/auth-state.service";

@NgModule({
    providers: [provideTokensRestorer()],
    imports: [NgxsModule.forFeature([AuthStateService])]
})
export class AuthModule {
}
