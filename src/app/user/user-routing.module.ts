import { AuthenticationGuard } from './../services/authentication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'user-profile', pathMatch: 'full', canActivate: [AuthenticationGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class UserRoutingModule { }
