import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTooltipModule} from '@angular/material/tooltip';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

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
import { ChangePasswordComponent } from '../../user-management/change-password/change-password.component'; 
import { NewUserComponent } from '../../user-management/new-user/new-user.component'; 
import { GroupsComponent } from '../../user-management/groups/groups.component'; 

import { VoteAssignmentComponent } from '../../mix-income-management/vote-assignment/voteassignment.component'; 
import { AssignedVotesComponent } from '../../mix-income-management/assignedvotes/assignedvotes.component'; 
import { VoteAssignmentDetailsComponent } from '../../mix-income-management/vote-assignmentdetails/voteassignmentdetails.component'; 
import { MixinOrderAddEditComponent } from '../../mix-income-management/mixinorder/mixinorderaddedit/mixinorderaddedit.component'; 
import { MixinOrderListComponent } from '../../mix-income-management/mixinorder/mixinorderlist/mixinorderlist.component'; 
import { MixinOrderViewComponent } from '../../mix-income-management/mixinorder/mixinorderview/mixinorderview.component'; 
import { ReportViewerComponent } from '../../reports/reportviewer.component'; 
import { MixinOrderCancelAprovalComponent } from '../../mix-income-management/mixinorder/mixinordercancelaproval/mixinordercancelaproval.component'; 
import { CashierComponent } from '../../cashier/cashier.component'; 
import { MixinSessionComponent } from '../../mix-income-management/mixinsession/mixinsession.component'; 
import { MixinSessionOrderListComponent } from '../../mix-income-management/mixinsessionorderlist/mixinsessionorderlist.component'; 

import { MatRippleModule} from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DpDatePickerModule } from 'ng2-date-picker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { DialogComponent } from '../../mix-income-management/mixinorder/mixinorderaddedit/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatDividerModule,
    MatTableModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatTooltipModule,
    AngularDualListBoxModule,
    AutocompleteLibModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    PdfViewerModule,
    DpDatePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxBarcode6Module,
    MatDialogModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
    ChangePasswordComponent,
    NewUserComponent,
    GroupsComponent,
    VoteAssignmentComponent,
    AssignedVotesComponent,
    VoteAssignmentDetailsComponent,
    MixinOrderAddEditComponent,
    MixinOrderListComponent,
    MixinOrderViewComponent,
    ReportViewerComponent,
    MixinOrderCancelAprovalComponent,
    DialogComponent,
    CashierComponent,
    MixinSessionComponent,
    MixinSessionOrderListComponent,
  ],
  providers: [  
    MatDatepickerModule,  
    DatePipe,
  ],
})
export class AdminLayoutModule {}
