import { USERS_CHILD } from './database-constants';
import { User } from './../models/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * User service
 *
 */
@Injectable()
export class UserService {

  // We use the subject to store the user model.
  // The subject will be populated with the latest user model.
  // This approach is used to pass the user between components.
  private subject: BehaviorSubject<User> = new BehaviorSubject(null);

  /**
   * Constructor
   *
   * @param {AngularFireDatabase} fireDb provides the functionality for
   * Firebase Database
   */
  constructor(private fireDb: AngularFireDatabase) {}

  public addUser(user: User): void {
    this.fireDb.object(`${USERS_CHILD}/${user.uid}`).set(user);
  }

  public getUser(uid: string): Observable<User> {
    return this.fireDb.object<User>(`${USERS_CHILD}/${uid}`).valueChanges();
  }

  /*
  * Save the user model in subject.
  */
  public saveUser(user: User) {
    this.subject.next(user);
  }

  // To retrieve the value from the subject use the getValue() method.
  // You can also subscribe and retrieve the user model.
  public getSavedUser(): BehaviorSubject<User> {
    return this.subject;
  }

  public updateEmail(user: User, newEmail: string): void {
    this.fireDb.object(`${USERS_CHILD}/${user.uid}`).update({email: newEmail});
    this.saveUser(user);
  }

  public updateMobile(user: User, newMobile: string): void {
    this.fireDb.object(`${USERS_CHILD}/${user.uid}`).update({mobile: newMobile});
    this.saveUser(user);
  }

  public updateName(user: User, newName: string): void {
    this.fireDb.object(`${USERS_CHILD}/${user.uid}`).update({name: newName});
    this.saveUser(user);
  }

}
