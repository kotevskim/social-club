import { UserService } from './../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ],
  declarations: [
    SignupComponent,
    ErrorAlertComponent,
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    UserService
  ]
})
export class AuthenticationModule { }
