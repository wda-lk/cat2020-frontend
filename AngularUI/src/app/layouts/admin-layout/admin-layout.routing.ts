import { Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';

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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'programmes',   component: ProgrammesComponent, canActivate: [AuthGuard]  },
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
    { path: 'newuser',   component: NewUserComponent, canActivate: [AuthGuard]  }
];
