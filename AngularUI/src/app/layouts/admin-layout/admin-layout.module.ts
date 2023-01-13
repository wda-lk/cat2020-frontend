import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTooltipModule} from '@angular/material/tooltip';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

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

import { UserDetailComponent } from '../../user-detail/user-detail.component'; 
import { NewUserComponent } from '../../new-user/new-user.component'; 

import { MatRippleModule} from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  imports: [
    //NotificationsService ,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatDividerModule,
    MatTableModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardComponent,
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
    UserDetailComponent,
    NewUserComponent
  ]
})
export class AdminLayoutModule {}
