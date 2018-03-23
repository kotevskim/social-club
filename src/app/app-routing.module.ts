import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './static/about/about.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'},
  { // feature module ChatModule
    path: 'chat',
    loadChildren: 'app/chat/chat.module#ChatModule'
  },
  { // feature module UserModule
    path: 'me',
    loadChildren: 'app/user/user.module#UserModule'
  },
  { // feature module AuthenticationModule
    path: 'who-are-you',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '**',
    redirectTo: 'app-page-not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
