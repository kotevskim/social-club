import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditDialogComponent } from '../../shared/edit-dialog/edit-dialog.component';
import { UserManagementService } from '../../core/user-management.service';

import { EditType } from '../../shared/edit-dialog/edit-details';
import { User } from '../shared/user';
import { AuthenticationService } from '../../core/authentication.service';
import { User as AuthUser } from '@firebase/auth-types';
import { FriendsService } from '../../core/friends.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  profileImage: any = '../../../assets/images/def_pp.png';
  @ViewChild(EditDialogComponent) editDialog: EditDialogComponent;

  constructor(
    private userService: UserManagementService,
    private friendsService: FriendsService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

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
            this.applyUserProfilePictureIfExists();
          }
        );
      } else {
         // the page has been refreshed (there is an active user)
         const authUser: AuthUser = this.authService.getCurrentUser();
         this.userService.getUser(authUser.uid).subscribe(
           snapshot => {
            console.log('DEBUG ::: Current user loaded from fireDb');
            this.userService.cacheCurrentUser(snapshot);
            this.userService.getCurrentUserFromCache()
             .subscribe(
                user => {
                  this.currentUser = user;
                  this.applyUserProfilePictureIfExists();
                }
              );
          });
        }
  }

  private applyUserProfilePictureIfExists() {
    if (this.currentUser.image !== null && this.currentUser.image !== '' && this.currentUser.image !== undefined) {
      this.profileImage = this.currentUser.image;
    }
  }

  onLogout(): void {
    this.authService.signout().then(() => {
      this.friendsService.clearFriendListFromCache();
      this.authService.isUserLoggedIn = false;
      this.nagivateToLogin();
    });
  }

  onNameEditClick() {
    // Note: Builder pattern is used for the EditDialogComponent
    this.editDialog.setTitle('Do you want to edit name?')
      .setBodyTitle('name')
      .setBodyLabel('Enter new name')
      .setEditType(EditType.NAME)
      .show();
  }

  onEmailEditClick() {
    this.editDialog.setTitle('Do you want to edit email?')
      .setBodyTitle('email')
      .setBodyLabel('Enter new email')
      .setEditType(EditType.EMAIL)
      .show();
  }

  onMobileEditClick() {
    this.editDialog.setTitle('Do you want to edit mobile?')
      .setBodyTitle('mobile')
      .setBodyLabel('Enter new mobile')
      .setEditType(EditType.MOBILE)
      .show();
  }

  onPasswordEditClick() {
    this.editDialog.setTitle('Do you want to edit password?')
      .setBodyTitle('password')
      .setBodyLabel('Enter new password')
      .setEditType(EditType.PASSWORD)
      .show();
  }

  onPersonEdit(event) {
    const selectedFiles: FileList = event.target.files;
    const file = selectedFiles.item(0);
    this.userService.addProfileImage(this.currentUser, file);
 }

  private nagivateToLogin() {
    this.router.navigateByUrl('/who-are-you/login');
  }

}
