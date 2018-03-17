import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


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
