import { UserManagementService } from '../../core/user-management.service';
import { AuthenticationService } from '../../core/authentication.service';
import { User } from '../../user/shared/user';

export enum EditType {
    NAME,
    EMAIL,
    MOBILE,
    PASSWORD
}

export class EditDetails {

    constructor(private authService: AuthenticationService,
                private userService: UserManagementService) {
    }

    public edit(editType: EditType, value: string) {
        switch (editType) {
            case EditType.NAME:
                this.editName(value);
                break;

            case EditType.EMAIL:
                this.editEmail(value);
                break;

            case EditType.MOBILE:
                this.editMobile(value);
                break;

            case EditType.PASSWORD:
                this.editPassword(value);
                break;
        }
    }

    private editName(name: string) {
        const user: User = this.userService.getCurrentUserFromCache().getValue();
        user.name = name;
        this.userService.updateName(user, name);
        alert('Name changed successfully');
    }

    // The email is stored in the Firebase authentication and database,
    // so we will need to update it in both places
    private editEmail(newEmail: string) {
        this.authService.changeEmail(newEmail).then(() => {
            const user: User = this.userService.getCurrentUserFromCache().getValue();
            user.email = newEmail;
            this.userService.updateEmail(user, newEmail); // update in DB
            alert('Email changed successfully');
        }).catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    private editMobile(mobile: string) {
        const user: User = this.userService.getCurrentUserFromCache().getValue();
        user.mobile = mobile;
        this.userService.updateMobile(user, mobile);
        alert('Mobile changed successfully');
    }

    private editPassword(value: string) {
        const newPassword: string = value;
        this.authService.changePassword(newPassword).then(() => {
            alert('Password changed successfully');
        }).catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
}
