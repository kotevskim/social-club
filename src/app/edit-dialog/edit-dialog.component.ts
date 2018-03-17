import { EditType, EditDetails } from './edit-details';
import { UserService } from './../services/user.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent {

  isVisible: boolean;
  titleMessage: string;
  bodyTitle: string;
  bodyLabel: string;
  editType: EditType;
  editDetails: EditDetails;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.editDetails = new EditDetails(authService, userService);
  }

  // We are exposing the following 4 methods to the parent
  // component so that the content of the edit-dialog can
  // be changed dynamically from the parent component.
  // Note: In order to have access to these methods, the
  // parent component must declare this component with
  // the @ViewChild annotation.
  // The following 4 methods are part of the builder pattern.
  // Builder pattern is a creational pattern that is used to
  // create complex objects. This is basically used when a constructor
  // in a class accepts many parameters.
  // This reduces the complexity of the constructor.
  public setTitle(title: string): EditDialogComponent {
    this.titleMessage = title;
    return this;
  }

  public setBodyTitle(bodyTitle: string): EditDialogComponent {
      this.bodyTitle = bodyTitle;
      return this;
  }

  public setBodyLabel(bodyLabel: string): EditDialogComponent {
      this.bodyLabel = bodyLabel;
      return this;
  }

  public setEditType(editType: EditType): EditDialogComponent {
      this.editType = editType;
      return this;
  }

  public show() {
    this.isVisible = true;
}

  public hide() {
      this.isVisible = false;
  }

  private onSubmit(editFormData): void {
      this.editDetails.edit(this.editType, editFormData.value.editValue);
  }
}
