import { UserManagementService } from './core/user-management.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { AuthenticationService } from './core/authentication.service';
import { FriendsService } from './core/friends.service';
import { User } from './user/shared/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  startAt: string;
  endAt: string;
  searchedUsers: User[];


  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private friendService: FriendsService,
    private userService: UserManagementService
  ) {}

  onLogout(): void {
    this.authService.signout().then(() => {
      this.friendService.clearFriendListFromCache();
      this.authService.isUserLoggedIn = false;
      this.nagivateToLogin();
    });
  }

  private nagivateToLogin() {
    this.router.navigateByUrl('/who-are-you/login');
  }

  onSearch(event) {
    const text = event.target.value;
    if (text !== '') {
    this.startAt = text;
    this.endAt = text + '\uf8ff';
    this.userService.searchUsersByName(this.startAt, this.endAt)
      .subscribe(users => {this.searchedUsers = users; console.log(this.searchedUsers); });
    }
  }
}
