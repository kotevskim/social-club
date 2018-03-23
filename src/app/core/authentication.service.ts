import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { User } from '@firebase/auth-types';


/**
 * Authentication service
 *
 */
@Injectable()
export class AuthenticationService {

  currentUser: User = null;
  public isUserLoggedIn = false;

  /**
   * Constructor
   *
   * @param {AngularFireAuth} angularFireAuth provides the
     functionality related to authentication
   */
  constructor(private angularFireAuth: AngularFireAuth) {}

  public signup(email: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public resetPassword(email: string): Promise<any> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.authState.map(auth => {
      if (auth == null) {
        return false;
      } else {
        this.currentUser = this.angularFireAuth.auth.currentUser;
        this.isUserLoggedIn = true;
        return true;
      }
    });
  }

  public getCurrentUser(): User {
    if (this.currentUser == null) {
      throw new Error('No currently active user, check if he is authenticated first');
    }
    return this.currentUser;
  }

  public signout(): Promise<any> {
    return this.angularFireAuth.auth.signOut();
  }

  public changeEmail(email: string): Promise<any> {
    return this.angularFireAuth.auth.currentUser.updateEmail(email);
  }

  public changePassword(password: string): Promise<any> {
    return this.angularFireAuth.auth.currentUser
    .updatePassword(password);
  }
}
