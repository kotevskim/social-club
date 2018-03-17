import { AuthenticationGuard } from './services/authentication.guard';
import {UserModule} from './user/user.module';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthenticationModule} from './authentication/authentication.module';
import {PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AboutComponent} from './about/about.component';
import {UserRoutingModule} from './user/user-routing.module';
import {AuthenticationRoutingModule} from './authentication/authentication-routing.module';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AuthenticationModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
