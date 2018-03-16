import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.sass']
})
export class ErrorAlertComponent {

  @Input() errorMessage: any;

}
