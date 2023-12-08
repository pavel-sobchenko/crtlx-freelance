import { NgModule } from '@angular/core'
import { HttpModule } from './http/http.module'
import { AuthModule } from "./auth/auth.module";

@NgModule({
    imports: [AuthModule, HttpModule]
})
export class CoreModule {
}
