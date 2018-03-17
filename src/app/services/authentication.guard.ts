import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  private isLoggedIn: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isLoggedIn: boolean = this.authService.isAuthenticated();
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
      return isLoggedIn;
  }
}
