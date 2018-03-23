import { FriendsService } from './user/shared/friends.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { AuthenticationService } from './core/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private friendService: FriendsService
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
}
