import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/shared/user';
import { AuthenticationService } from '../shared/authentication.service';
import { UserManagementService } from '../../core/user-management.service';



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
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.getUserInfo(user.uid);
      }
    });
  }

  onLogin(loginFormData): void {
    this.authService.login(loginFormData.value.email, loginFormData.value.password)
      .then(userInfo => {
        // Logged in user
        const uid: string = userInfo.uid;
        this.getUserInfo(uid);
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

  private getUserInfo(uid: string): void {
    this.userService.getUser(uid).subscribe(snapshot => {
      this.activeUser = snapshot;
      this.userService.saveUser(this.activeUser);
      this.nagivateToUserPeofile();
    });

  }

  private nagivateToUserPeofile() {
    this.router.navigateByUrl('/user-profile');
  }


}
