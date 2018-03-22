import { FriendsService } from './../shared/friends.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditDialogComponent } from '../../shared/edit-dialog/edit-dialog.component';
import { UserManagementService } from '../../core/user-management.service';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { EditType } from '../../shared/edit-dialog/edit-details';
import { User } from '../shared/user';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  profileImage: any = '../../../assets/images/def_pp.png';
  @ViewChild(EditDialogComponent) editDialog: EditDialogComponent;

  constructor(
    private userService: UserManagementService,
    private friendsService: FriendsService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getSavedUser().getValue();
    this.userService.getSavedUser().subscribe(
      (user) => {
          if (this.user.image !== null && this.user.image !== '' && this.user.image !== undefined) {
              this.profileImage = this.user.image;
          }
      }
    );
  }

  onLogout(): void {
    this.authService.signout().then(() => {
      this.friendsService.clearFriendsCache();
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
    this.userService.addProfileImage(this.user, file);
 }

  private nagivateToLogin() {
    this.router.navigateByUrl('/login');
  }

}
