import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { ProgrammesComponent } from '../../programmes/programmes.component'; //edit
import { VoteincometitleComponent } from '../../voteincometitle/voteincometitle.component'; // edit
import { VoteincomesubtitleComponent } from '../../voteincomesubtitle/voteincomesubtitle.component'; // edit
import { VoteincomeprojectComponent } from '../../voteincomeproject/voteincomeproject.component'; //edit
import { VoteincomesubprojectComponent } from '../../voteincomesubproject/voteincomesubproject.component'; //edit

import { BalancesheettitleComponent } from '../../balancesheettitle/balancesheettitle.component'; //edit
import { BalancesheetsubtitleComponent } from '../../balancesheetsubtitle/balancesheetsubtitle.component'; // edit
import { VotedetailComponent } from '../../votedetail/votedetail.component'; // edit
import { AccountdetailComponent } from '../../accountdetail/accountdetail.component'; //edit
import { AccountbalancedetailComponent } from '../../accountbalancedetail/accountbalancedetail.component'; //edit

import { VoteallocationComponent } from '../../voteallocation/voteallocation.component'; //edit
import { BalancesheetbalanceComponent } from '../../balancesheetbalance/balancesheetbalance.component'; //edit


// import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatRippleModule} from '@angular/material/core';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
// import { ProgrammesComponent } from '../../programmes/programmes.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';


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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,

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
    NotificationsComponent,
    UpgradeComponent
    // ProgrammesComponent
    
  ]
})

export class AdminLayoutModule {}
