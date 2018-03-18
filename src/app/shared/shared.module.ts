import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './error-alert/error-alert.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MyDateTimePipe } from './my-date-time.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    MyDateTimePipe,
    ErrorAlertComponent,
    EditDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MyDateTimePipe,
    ErrorAlertComponent,
    EditDialogComponent,
    AngularFontAwesomeModule
  ]
})
export class SharedModule {

  // This solves the cross module problem
  static forRoot() {
    return {
        ngModule: SharedModule,
        providers: [],
    };
 }
}
