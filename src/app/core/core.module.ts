import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementService } from './user-management.service';

@NgModule({
  providers: [UserManagementService]
})
export class CoreModule { }
