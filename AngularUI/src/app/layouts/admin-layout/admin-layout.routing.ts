import { Routes } from '@angular/router';
import { AuthGuard } from '../../system-security/_helpers';
import { PermissionGuard } from '../../system-security/_helpers/permission.guard';

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
import { MixinOrderListComponent } from '../../mix-income-management/mixinorder/mixinorderlist/mixinorderlist.component'; 
import { MixinOrderAddEditComponent } from '../../mix-income-management/mixinorder/mixinorderaddedit/mixinorderaddedit.component'; 
import { MixinOrderViewComponent } from '../../mix-income-management/mixinorder/mixinorderview/mixinorderview.component'; 
import { AccessDeniedComponent } from '../../common/accessdenied/accessdenied.component'; 
import { ReportViewerComponent } from '../../reports/reportviewer.component'; 
import { ReportViewerNewComponent } from '../../reportviewer/reportviewernew.component'; 

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]  },
    // { path: 'programmes',      component: ProgrammesComponent, canActivate: [AuthGuard]  },
    { path: 'programmes',   component: ProgrammesComponent, canActivate: [AuthGuard]},
    { path: 'voteincometitle',   component: VoteincometitleComponent, canActivate: [AuthGuard]  }, 
    { path: 'voteincomesubtitle',   component: VoteincomesubtitleComponent, canActivate: [AuthGuard]  },
    { path: 'voteincomeproject',   component: VoteincomeprojectComponent, canActivate: [AuthGuard]  },  
    { path: 'voteincomesubproject',   component: VoteincomesubprojectComponent, canActivate: [AuthGuard]  }, 
    { path: 'balancesheettitle',   component: BalancesheettitleComponent, canActivate: [AuthGuard]  },
    { path: 'balancesheetsubtitle',   component: BalancesheetsubtitleComponent, canActivate: [AuthGuard]  }, 
    { path: 'votedetail',   component: VotedetailComponent, canActivate: [AuthGuard]  },
    { path: 'accountdetail',   component: AccountdetailComponent, canActivate: [AuthGuard]  }, 
    { path: 'accountbalancedetail',   component: AccountbalancedetailComponent, canActivate: [AuthGuard]  }, 
    { path: 'voteallocation',   component: VoteallocationComponent, canActivate: [AuthGuard]  },   
    { path: 'balancesheetbalance',   component: BalancesheetbalanceComponent, canActivate: [AuthGuard]  },
    { path: 'userdetail',   component: UserDetailComponent, canActivate: [AuthGuard]  },
    { path: 'changepassword',   component: ChangePasswordComponent, canActivate: [AuthGuard]  },
    { path: 'newuser',   component: NewUserComponent, canActivate: [AuthGuard]  },
    { path: 'groups',   component: GroupsComponent, canActivate: [AuthGuard]  },
    { path: 'voteassignment',   component: VoteAssignmentComponent, canActivate: [AuthGuard]  },
    { path: 'assignedvotes',   component: AssignedVotesComponent, canActivate: [AuthGuard]  },
    { path: 'voteassignmentdetails',   component: VoteAssignmentDetailsComponent, canActivate: [AuthGuard]  },
    { path: 'mixinorderlist',   component: MixinOrderListComponent, canActivate: [AuthGuard]  },
    { path: 'mixinorderaddedit',   component: MixinOrderAddEditComponent, canActivate: [AuthGuard]  },
    { path: 'mixinorderview/:orderid',   component: MixinOrderViewComponent, canActivate: [AuthGuard]  },
    { path: 'accessdenied', component: AccessDeniedComponent, data: {} },
    { path: 'reportviewer', component: ReportViewerComponent, canActivate: [AuthGuard], data: {} },
    { path: 'reportviewernew', component: ReportViewerNewComponent, canActivate: [AuthGuard], data: {} }



    // { path: 'programmes',   component: ProgrammesComponent, canActivate: [AuthGuard], data: {rules: ['VTPRGMADDEDIT']} },
    // { path: 'voteincometitle',   component: VoteincometitleComponent, canActivate: [AuthGuard] , data: {rules: ['VTTITLEADDEDIT']} }, 
    // { path: 'voteincomesubtitle',   component: VoteincomesubtitleComponent, canActivate: [AuthGuard] , data: {rules: ['VTSUBTITLEADDEDIT']} },
    // { path: 'voteincomeproject',   component: VoteincomeprojectComponent, canActivate: [AuthGuard], data: {rules: ['VTPROJECTADDEDIT']}  },  
    // { path: 'voteincomesubproject',   component: VoteincomesubprojectComponent, canActivate: [AuthGuard], data: {rules: ['VTSUBPROJECTADDEDIT']}  }, 
    // { path: 'balancesheettitle',   component: BalancesheettitleComponent, canActivate: [AuthGuard], data: {rules: ['VTBALSHEETADDEDIT']}  },
    // { path: 'balancesheetsubtitle',   component: BalancesheetsubtitleComponent, canActivate: [AuthGuard], data: {rules: ['VTSSUBBALSHEETADDEDIT']}  }, 
    // { path: 'votedetail',   component: VotedetailComponent, canActivate: [AuthGuard], data: {rules: ['VTDETAILSADDEDIT']}  },
    // { path: 'accountdetail',   component: AccountdetailComponent, canActivate: [AuthGuard], data: {rules: ['VTACCDTLADDEDIT']}  }, 
    // { path: 'accountbalancedetail',   component: AccountbalancedetailComponent, canActivate: [AuthGuard], data: {rules: ['VTACCBALDTLADDEDIT']}  }, 
    // { path: 'voteallocation',   component: VoteallocationComponent, canActivate: [AuthGuard], data: {rules: ['VTESTDINCMADDEDIT']}  },   
    // { path: 'balancesheetbalance',   component: BalancesheetbalanceComponent, canActivate: [AuthGuard], data: {rules: ['VTBALSHTBALADDEDIT']}  },
    // { path: 'userdetail',   component: UserDetailComponent, canActivate: [AuthGuard], data: {rules: ['USRPROFILEEDIT']}  },
    // { path: 'changepassword',   component: ChangePasswordComponent, canActivate: [AuthGuard], data: {rules: ['USRCHNGPWD']}  },
    // { path: 'newuser',   component: NewUserComponent, canActivate: [AuthGuard], data: {rules: ['NEWUSERADDEDIT']}  },
    // { path: 'groups',   component: GroupsComponent, canActivate: [AuthGuard], data: {rules: ['USERGROUPSADDEDIT']}  },
    // { path: 'voteassignment',   component: VoteAssignmentComponent, canActivate: [AuthGuard], data: {rules: ['VOTEASSIGNMNT']}  },
    // { path: 'assignedvotes',   component: AssignedVotesComponent, canActivate: [AuthGuard], data: {rules: ['ASGNEDVOTELIST']}  },
    // { path: 'voteassignmentdetails',   component: VoteAssignmentDetailsComponent, canActivate: [AuthGuard], data: {rules: ['CUSTOMVOTEASIGNADDEDIT']}  },
    // { path: 'mixinorderlist',   component: MixinOrderListComponent, canActivate: [AuthGuard], data: {rules: ['MXORDERVIEW']}  },
    // { path: 'mixinorderaddedit',   component: MixinOrderAddEditComponent, canActivate: [AuthGuard], data: {rules: ['MXORDERADDEDIT']}  },
    // { path: 'mixinorderview/:orderid',   component: MixinOrderViewComponent, canActivate: [AuthGuard], data: {rules: ['MXORDERVIEW']}  },
    // { path: 'accessdenied', component: AccessDeniedComponent, data: {} }
];
