import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  imports: [
    FormsModule,
    SharedModule.forRoot(),
    AuthenticationRoutingModule,
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
  ]
})
export class AuthenticationModule { }
