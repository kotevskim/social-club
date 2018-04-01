import { FriendsService } from './friends.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementService } from './user-management.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
  providers: [
    UserManagementService,
    AuthenticationService,
    AuthenticationGuard,
    AngularFireAuth,
    FriendsService
  ]
})
export class CoreModule { }
