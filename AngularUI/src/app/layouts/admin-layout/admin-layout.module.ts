import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { VoteManagementComponent } from '../../votemanagement/votemanagement.component'; 
import { ProgrammesComponent } from '../../programmes/programmes.component'; 
import { VoteincometitleComponent } from '../../voteincometitle/voteincometitle.component'; 
import { VoteincomesubtitleComponent } from '../../voteincomesubtitle/voteincomesubtitle.component'; 
import { VoteincomeprojectComponent } from '../../voteincomeproject/voteincomeproject.component'; 
import { VoteincomesubprojectComponent } from '../../voteincomesubproject/voteincomesubproject.component'; 

import { BalancesheettitleComponent } from '../../balancesheettitle/balancesheettitle.component'; 
import { BalancesheetsubtitleComponent } from '../../balancesheetsubtitle/balancesheetsubtitle.component'; 
import { VotedetailComponent } from '../../votedetail/votedetail.component'; 
import { AccountdetailComponent } from '../../accountdetail/accountdetail.component'; 
import { AccountbalancedetailComponent } from '../../accountbalancedetail/accountbalancedetail.component'; 

import { VoteallocationComponent } from '../../voteallocation/voteallocation.component'; 
import { BalancesheetbalanceComponent } from '../../balancesheetbalance/balancesheetbalance.component'; 


// import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatRippleModule} from '@angular/material/core';
// import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
// import { ProgrammesComponent } from '../../programmes/programmes.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';

import { MatAutocompleteModule } from '@angular/material/autocomplete';


//import { NotificationsService } from 'angular2-notifications';


@NgModule({
  imports: [
    //NotificationsService ,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule,
    MatAutocompleteModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,

    VoteManagementComponent,
    ProgrammesComponent,
    VoteincometitleComponent,
    VoteincomesubtitleComponent,
    VoteincomeprojectComponent,
    VoteincomesubprojectComponent,

    BalancesheettitleComponent,
    BalancesheetsubtitleComponent,

    VotedetailComponent,
    AccountdetailComponent,
    AccountbalancedetailComponent,
    VoteallocationComponent,

    BalancesheetbalanceComponent,
    
    // TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent
    // ProgrammesComponent
    
  ]
})

export class AdminLayoutModule {}
