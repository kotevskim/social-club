import { USER_DETAILS_CHILD, FRIENDS_CHILD } from './database-constants';
import { Friend } from './../models/friend';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FriendsService {

  /**
   * Constructor
   *
   * @param {AngularFireDatabase} fireDb provides the functionality for
   * Firebase Database
   */
  constructor(private fireDb: AngularFireDatabase) {}

  loadFirstPage(uid: string, pageSize: number): Observable<Friend[]> {
    return this.fireDb.list<Friend>(`${USER_DETAILS_CHILD}/${FRIENDS_CHILD}/${uid}`,
      ref => ref.limitToFirst(pageSize)).valueChanges();
  }

  loadNextPage(uid: string,  friendKey: string, pageSize: number): Observable<Friend[]> {
    return this.fireDb.list<Friend>(`${USER_DETAILS_CHILD}/${FRIENDS_CHILD}/${uid}`,
      ref => ref.orderByKey().startAt(friendKey).limitToFirst(pageSize + 1)).valueChanges();
  }

  loadPreviousPage(uid: string,  friendKey: string, pageSize: number): Observable<Friend[]> {
    return this.fireDb.list<Friend>(`${USER_DETAILS_CHILD}/${FRIENDS_CHILD}/${uid}`,
      ref => ref.orderByKey().startAt(friendKey).limitToLast(pageSize + 1)).valueChanges();
  }

}
