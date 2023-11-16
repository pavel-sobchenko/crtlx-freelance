import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgxsModule } from '@ngxs/store'
import { environment } from 'src/environments/environment'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
