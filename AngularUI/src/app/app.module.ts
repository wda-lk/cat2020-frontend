import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTooltipModule} from '@angular/material/tooltip';

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
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
