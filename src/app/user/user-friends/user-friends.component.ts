import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import 'firebase/storage';
import {Friend} from '../shared/friend';
import {FriendsService} from '../shared/friends.service';
import {UserManagementService} from '../../core/user-management.service';
import {User} from '../shared/user';

@Component({
    selector: 'app-friends-userfriends',
    styleUrls: ['user-friends.component.sass'],
    templateUrl: 'user-friends.component.html'
})
export class UserFriendsComponent implements OnInit {

    friends: Friend[];
    totalCount: number;
    pageSize = 3;
    currentCount = 0;
    previousCount = 0;
    isLeftVisible = false;
    isRightVisible = true;
    user: User;

    constructor(
      private friendService: FriendsService,
      private userService: UserManagementService,
      private router: Router
    ) {}

    ngOnInit() {
        this.user = this.userService.getSavedUser().getValue();
        this.totalCount = this.user.friendcount;
        this.friendService.loadFirstPage(this.user.uid, this.pageSize)
            .subscribe(friends => {
                this.friends = friends;
                const count: number = this.friends.length;
                this.currentCount = count;
                this.leftArrowVisible();
                this.rightArrowVisible();
            });
    }

    onLeft(): void {
        this.previous();
    }

    onRight(): void {
        this.next();
    }

    next() {
        this.friendService.loadNextPage(this.user.uid,
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
        this.friendService.loadPreviousPage(this.user.uid,
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
      this.router.navigate(['/chat' , id]);
  }

}
