import { PROFILE } from './../constants/storage-constants';
import { USERS_CHILD } from './../constants/database-constants';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../user/shared/user';

/**
 * User service
 *
 */
@Injectable()
export class UserManagementService {

  // We use the subject to store the user model.
  // This is acache user object.
  // The subject will be populated with the latest user model.
  // This approach is used to pass the user between components.
  private subject: BehaviorSubject<User> = new BehaviorSubject(null);

  private fbStorage: any;
  private basePath = PROFILE;

  /**
   * Constructor
   *
   * @param {AngularFireDatabase} fireDb provides the functionality for
   * Firebase Database
   */
  constructor(private fireDb: AngularFireDatabase) {
    this.fbStorage = fireDb.app.storage();
  }

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

  public addProfileImage(user: User, file: File) {
    this.fbStorage.ref(`${this.basePath}/${file.name}`).put(file).then(
        snapshot => {
            const imageUrl: string = snapshot.downloadURL;
            this.fireDb.object(`${USERS_CHILD}/${user.uid}`).update({image: imageUrl});
            user.image = imageUrl;
            // refresh the cache user object
            this.saveUser(user);
        }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

}
