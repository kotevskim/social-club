import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/shared/user';
import { UserManagementService } from '../../core/user-management.service';
import { AuthenticationService } from '../../core/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  showError: boolean;
  errorMessage: string;
  private activeUser: User;

  constructor(
    private authService: AuthenticationService,
    private userService: UserManagementService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    // WHY THIS DOWSNT WORK??????!!!
    // this.authService.isAuthenticated().subscribe(
    //   authenticated => {
    //     if (authenticated) {
    //       this.nagivateToUserPeofile();
    //     }
    // });
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.cacheUserAndRedirect(user.uid);
      }
    });
  }

  onLogin(loginFormData): void {
    this.authService.login(loginFormData.value.email, loginFormData.value.password)
      .then(userInfo => { // User is logged in
        this.cacheUserAndRedirect(userInfo.uid);
        this.authService.isUserLoggedIn = true;
      }).catch(error => {
        this.showError = true;
        this.errorMessage = error.message;
      });
  }

  onReset(resetFormData): void {
    this.authService.resetPassword(resetFormData.value.email).then(() => {
      alert('Reset instruction sent to your mail');
    }).catch(error => {
      this.errorMessage = error.message;
      this.showError = true;
    });
  }

  private cacheUserAndRedirect(uid: string): void {
    this.userService.getUser(uid).subscribe(snapshot => {
      this.userService.cacheCurrentUser(snapshot);
      this.userService.getCurrentUserFromCache().subscribe(
        user => {
          this.activeUser = user;
          this.nagivateToUserPeofile();
      });
    });

  }

  private nagivateToUserPeofile() {
    this.router.navigateByUrl('/me/info');
  }
}
