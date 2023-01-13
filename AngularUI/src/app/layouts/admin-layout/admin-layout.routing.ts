import { Routes } from '@angular/router';

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

import { NewUserComponent } from '../../new-user/new-user.component';
import { UserDetailComponent } from '../../user-detail/user-detail.component';


import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import { AuthGuard } from '../../_helpers';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]  },
    // { path: 'user-profile',   component: UserProfileComponent },

    { path: 'votemanagement',   component: VoteManagementComponent, canActivate: [AuthGuard]  },
    { path: 'programmes',   component: ProgrammesComponent, canActivate: [AuthGuard]  },
    { path: 'voteincometitle',   component: VoteincometitleComponent, canActivate: [AuthGuard]  }, 
    { path: 'voteincomesubtitle',   component: VoteincomesubtitleComponent, canActivate: [AuthGuard]  }, //edit
    { path: 'voteincomeproject',   component: VoteincomeprojectComponent, canActivate: [AuthGuard]  }, //edit  
    { path: 'voteincomesubproject',   component: VoteincomesubprojectComponent, canActivate: [AuthGuard]  }, //edit  

    { path: 'balancesheettitle',   component: BalancesheettitleComponent, canActivate: [AuthGuard]  },
    { path: 'balancesheetsubtitle',   component: BalancesheetsubtitleComponent, canActivate: [AuthGuard]  }, 
    { path: 'votedetail',   component: VotedetailComponent, canActivate: [AuthGuard]  }, //edit
    { path: 'accountdetail',   component: AccountdetailComponent, canActivate: [AuthGuard]  }, //edit  
    { path: 'accountbalancedetail',   component: AccountbalancedetailComponent, canActivate: [AuthGuard]  }, //edit  

    { path: 'voteallocation',   component: VoteallocationComponent, canActivate: [AuthGuard]  }, //edit  
    { path: 'balancesheetbalance',   component: BalancesheetbalanceComponent, canActivate: [AuthGuard]  }, //edit 
    
    { path: 'new-user',   component: NewUserComponent, canActivate: [AuthGuard]  },
    { path: 'user-detail',   component: UserDetailComponent, canActivate: [AuthGuard]  },
    
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },

//To TOPOf routs
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    
];
