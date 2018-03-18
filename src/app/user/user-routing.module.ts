import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { AuthenticationGuard } from '../authentication/shared/authentication.guard';


const routes: Routes = [
  {path: '', redirectTo: 'user-profile', pathMatch: 'full', canActivate: [AuthenticationGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'friends', component: UserFriendsComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class UserRoutingModule { }
