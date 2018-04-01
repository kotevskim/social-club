import { ChatModule } from './chat/chat.module';
import { CoreModule } from './core/core.module';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './static/page-not-found/page-not-found.component';
import { AboutComponent } from './static/about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AuthenticationModule,
    // UserModule, // ??? what if imported
    SharedModule.forRoot(),
    CoreModule,
    // ChatModule
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
  ],
  providers: [
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
