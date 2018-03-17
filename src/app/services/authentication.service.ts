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

  /**
   * Constructor
   *
   * @param {AngularFireAuth} angularFireAuth provides the
     functionality related to authentication
   */
  constructor(private angularFireAuth: AngularFireAuth) { }

  public signup(email: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public resetPassword(email: string): Promise<any> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  // THE RESULT IS NOT AVAILABLE IMMEDIATELY, READ ONLINE!!!!
  public isAuthenticated(): boolean {
    return this.angularFireAuth.auth.currentUser ? true : false;
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
