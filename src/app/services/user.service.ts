import { USERS_CHILD } from './database-constants';
import { User } from './../models/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/**
 * User service
 *
 */
@Injectable()
export class UserService {

  /**
   * Constructor
   *
   * @param {AngularFireDatabase} fireDb provides the functionality for
   * Firebase Database
   */
  constructor(private fireDb: AngularFireDatabase) { }

  public addUser(user: User): void {
    this.fireDb.object(`${USERS_CHILD}/${user.uid}`).set(user);
  }

}
