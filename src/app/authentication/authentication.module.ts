import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './shared/authentication.service';
import { AuthenticationGuard } from './shared/authentication.guard';
import { AngularFireAuth } from 'angularfire2/auth';


@NgModule({
  imports: [
    AuthenticationRoutingModule,
    FormsModule,
    SharedModule.forRoot()
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    AngularFireAuth,
  ]
})
export class AuthenticationModule { }
