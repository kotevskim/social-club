import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Friend } from './friend';
import { USER_DETAILS_CHILD, FRIENDS_CHILD } from '../../constants/database-constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FriendsService {

  // For caching purposes
  private friendsSubject: BehaviorSubject<Friend[]> = new BehaviorSubject(null);

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

  public getAllFriends(uid: string): Observable<Friend[]> {
    return this.fireDb.list<Friend>(`${USER_DETAILS_CHILD}/${FRIENDS_CHILD}/${uid}`)
      .valueChanges();
  }

  public cacheFriends(friends: Friend[]) {
    this.friendsSubject.next(friends);
  }

  public isFriendsCacheEmpty() {
    return this.friendsSubject.getValue() == null;
  }

  public getCachedFriends(): BehaviorSubject<Friend[]> {
    return this.friendsSubject;
  }

  public clearFriendsCache() {
    this.friendsSubject = new BehaviorSubject(null);
  }

}
