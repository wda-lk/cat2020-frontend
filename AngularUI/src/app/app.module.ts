import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTooltipModule} from '@angular/material/tooltip';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './layouts/components/appheader/appheader.component';
import { AppmenuComponent } from './layouts/components/appmenu/appmenu.component';
import { AppfooterComponent } from './layouts/components/appfooter/appfooter.component';
import { AppsettingComponent } from './layouts/components/appsetting/appsetting.component';

import { LoginComponent } from './system-security/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './system-security/_helpers';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { JwtModule } from '@auth0/angular-jwt';

import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    LoginComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
    HttpClientModule,
    AngularDualListBoxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    // JwtModule.forRoot({}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
