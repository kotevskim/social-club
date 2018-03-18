import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { SharedModule } from '../shared/shared.module';
import { FriendsService } from './shared/friends.service';


@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    UserProfileComponent,
    UserFriendsComponent,
  ],
  providers: [
    FriendsService
  ]
})
export class UserModule {}
