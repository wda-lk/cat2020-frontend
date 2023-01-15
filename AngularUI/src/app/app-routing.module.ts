import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
// import { LogInComponent } from './log-in/log-in.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

//forlogin
// import { HomeComponent } from './home';
import { LoginComponent } from './system-security/login';
import { AuthGuard } from './system-security/_helpers';


const routes: Routes =[
   { path: '', component: AdminLayoutComponent, canActivate: [AuthGuard] },
   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
    { path: 'login', component: LoginComponent },
 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [RouterModule
  ],
})
export class AppRoutingModule { }
