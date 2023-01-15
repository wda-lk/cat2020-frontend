import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTooltipModule} from '@angular/material/tooltip';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { ProgrammesComponent } from '../../vote-management/programmes/programmes.component'; 
import { VoteincometitleComponent } from '../../vote-management/voteincometitle/voteincometitle.component'; 
import { VoteincomesubtitleComponent } from '../../vote-management/voteincomesubtitle/voteincomesubtitle.component'; 
import { VoteincomeprojectComponent } from '../../vote-management/voteincomeproject/voteincomeproject.component'; 
import { VoteincomesubprojectComponent } from '../../vote-management/voteincomesubproject/voteincomesubproject.component'; 

import { BalancesheettitleComponent } from '../../vote-management/balancesheettitle/balancesheettitle.component'; 
import { BalancesheetsubtitleComponent } from '../../vote-management/balancesheetsubtitle/balancesheetsubtitle.component'; 
import { VotedetailComponent } from '../../vote-management/votedetail/votedetail.component'; 
import { AccountdetailComponent } from '../../vote-management/accountdetail/accountdetail.component'; 
import { AccountbalancedetailComponent } from '../../vote-management/accountbalancedetail/accountbalancedetail.component'; 
import { VoteallocationComponent } from '../../vote-management/voteallocation/voteallocation.component'; 
import { BalancesheetbalanceComponent } from '../../vote-management/balancesheetbalance/balancesheetbalance.component'; 

import { UserDetailComponent } from '../../user-management/user-detail/user-detail.component'; 
import { NewUserComponent } from '../../user-management/new-user/new-user.component'; 

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
