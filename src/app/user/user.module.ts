import { FormsModule } from '@angular/forms';
import { AuthenticationGuard } from './../services/authentication.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { FriendsService } from '../services/friends.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  declarations: [
    UserProfileComponent,
    EditDialogComponent,
    UserFriendsComponent
  ],
  providers: [
    AuthenticationGuard,
    FriendsService
  ]
})
export class UserModule {}
