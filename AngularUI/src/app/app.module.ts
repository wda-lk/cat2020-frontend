import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { VoteincomesubprojectComponent } from './voteincomesubproject/voteincomesubproject.component';
// import { LogInComponent } from './log-in/log-in.component';
import { HttpProviderService } from './services/http-provider.service';
// import { FormsModule } from '@angular/forms';
//import { NotificationsService } from 'angular2-notifications';

import {MatIconModule} from '@angular/material/icon'; //edit
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
// import { VoteProgrammeComponent } from './vote-programme/vote-programme.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';

//for Login New
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { WebApiService } from '../app/services/web-api.service';


// import { MatTableDataSource } from '@angular/material';
// import { MatTableDataSource } from '@angular/material/table';

// import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
//   MatSortModule, MatTableModule } from "@angular/material";
// import { VoteProgrammesComponent } from './vote-programmes/vote-programmes.component';

@NgModule({
  imports: [
    //NotificationsService,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule,
    // MatTableDataSource,
    FormsModule,
    // MatPaginatorModule
   

    //for login
    BrowserModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    // LogInComponent,
    LoginComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    WebApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
