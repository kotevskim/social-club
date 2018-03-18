import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './static/about/about.component';


export const ROUTES: Routes = [
  {path: 'about', component: AboutComponent, pathMatch: 'full'},
  {path: '**', redirectTo: 'app-page-not-found'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
