import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.signout().then(() => this.nagivateToLogin());
  }

  private nagivateToLogin() {
    this.router.navigateByUrl('/login');
  }

}
