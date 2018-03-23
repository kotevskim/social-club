import { UserManagementService } from './../../core/user-management.service';
import { Component } from '@angular/core';
import { User } from '../../user/shared/user';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  errorMessage: string;
  showError: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserManagementService
  ) {}

  onSignup(signupFormData): void {
    this.authService.signup(signupFormData.value.email, signupFormData.value.password)
      .then(userInfo => { // userInfo contains only email and uid
        // Register the new user
        const user: User = new User(
          signupFormData.value.email,
          signupFormData.value.name,
          signupFormData.value.mobile,
          userInfo.uid,
          0,
          ''
        );
        this.writeNewUser(user);
      }).catch(error => {
        this.showError = true;
        this.errorMessage = error.message;
      });
  }

  private writeNewUser(user: User): void {
    this.userService.addUser(user);
  }
}
