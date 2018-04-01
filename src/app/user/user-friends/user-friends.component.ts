import { User } from './../shared/user';
import { AuthenticationService } from './../../core/authentication.service';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import 'firebase/storage';
import {Friend} from '../shared/friend';

import {UserManagementService} from '../../core/user-management.service';
import { User as AuthUser } from '@firebase/auth-types';
import { FriendsService } from '../../core/friends.service';
// import {User} from '../shared/user';

@Component({
    selector: 'app-friends-userfriends',
    styleUrls: ['user-friends.component.scss'],
    templateUrl: 'user-friends.component.html'
})
export class UserFriendsComponent implements OnInit {

    friends: Friend[];
    currentUser: User;
    totalCount: number;
    pageSize = 3;
    currentCount = 0;
    previousCount = 0;
    isLeftVisible = false;
    isRightVisible = true;

    constructor(
      private friendService: FriendsService,
      private userService: UserManagementService,
      private authService: AuthenticationService,
      private router: Router
    ) {}

    // this.totalCount = this.user.friendcount;
      // this.friendService.loadFirstPage(this.user.uid, this.pageSize)
      //     .subscribe(friends => {
      //         this.friends = friends;
      //         const count: number = this.friends.length;
      //         this.currentCount = count;
      //         this.leftArrowVisible();
      //         this.rightArrowVisible();
      //     });

      private loadFriendList(uid: string) {
        if (this.friendService.isFriendListCached()) {
          this.friendService.getFriendsFromCache().subscribe(
            friends => {
              this.friends = friends;
              console.log('DEBUG ::: Friends loaded from cache');
            });
        } else {
          this.friendService.getAllFriends(uid).subscribe(
            friends => {
              console.log('DEBUG ::: Friends loaded from database');
              this.friendService.cacheFriendList(friends);
              this.friendService.getFriendsFromCache().subscribe(
                f => {
                  this.friends = f;
              });
            }
          );
        }
      }

    ngOnInit(): void {
      // If the guard on this route passes, that means there is an active user
      // and we can get it with the getCurrentUser() method of the
      // AuthenticationService.
      // The method returns object of type User, from the
      // '@firebase/auth-types' module.

      // If there is no cached user that means that the page has been refreshed,
      // because there must be an active user (because of the guard).
      if (this.userService.isCurrentUserCached()) {
        this.userService.getCurrentUserFromCache().subscribe(
          user => {
            console.log('DEBUG ::: Current user loaded from cache');
            this.currentUser = user;
            this.loadFriendList(this.currentUser.uid);
        });
      } else {
         // the page has been refreshed (there is an active user)
         const authUser: AuthUser = this.authService.getCurrentUser();
         this.userService.getUser(authUser.uid).subscribe(
           snapshot => {
            console.log('DEBUG ::: Current user loaded from fireDb');
            this.userService.cacheCurrentUser(snapshot);
            this.userService.getCurrentUserFromCache().subscribe(
              user => {
                this.currentUser = user;
              }
            );
            this.loadFriendList(this.currentUser.uid);
          });
        }
    }

    onLeft(): void {
        this.previous();
    }

    onRight(): void {
        this.next();
    }

    next() {
        this.friendService.loadNextPage(this.currentUser.uid,
            this.friends[this.friends.length - 1].uid,
            this.pageSize
        ).subscribe(friends => {
            this.friends = friends;
            const count: number = this.friends.length;
            this.previousCount = count - 1;
            this.currentCount += this.previousCount;
            this.leftArrowVisible();
            this.rightArrowVisible();
        });


    }

    previous() {
        this.friendService.loadPreviousPage(this.currentUser.uid,
            this.friends[0].uid,
            this.pageSize
        ).subscribe(friends => {
            this.friends = friends;
            const count: number = this.friends.length;
            this.currentCount -= this.previousCount;
            this.leftArrowVisible();
            this.rightArrowVisible();
        });

    }

    leftArrowVisible(): void {
        this.isLeftVisible = this.currentCount > this.pageSize;
    }

    rightArrowVisible(): void {
        this.isRightVisible = this.totalCount > this.currentCount;
    }

    onChat(id: string): void {
      this.router.navigate(['/chat/conversation' , id]);
  }

}
