import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    UserProfileComponent,
    UserFriendsComponent,
  ],
})
export class UserModule {}
