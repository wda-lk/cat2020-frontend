import { Routes } from '@angular/router';

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

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },

    { path: 'programmes',   component: ProgrammesComponent },
    { path: 'voteincometitle',   component: VoteincometitleComponent }, 
    { path: 'voteincomesubtitle',   component: VoteincomesubtitleComponent }, //edit
    { path: 'voteincomeproject',   component: VoteincomeprojectComponent }, //edit  
    { path: 'voteincomesubproject',   component: VoteincomesubprojectComponent }, //edit  

    { path: 'balancesheettitle',   component: BalancesheettitleComponent },
    { path: 'balancesheetsubtitle',   component: BalancesheetsubtitleComponent }, 
    { path: 'votedetail',   component: VotedetailComponent }, //edit
    { path: 'accountdetail',   component: AccountdetailComponent }, //edit  
    { path: 'accountbalancedetail',   component: AccountbalancedetailComponent }, //edit  

    { path: 'voteallocation',   component: VoteallocationComponent }, //edit  
    { path: 'balancesheetbalance',   component: BalancesheetbalanceComponent }, //edit 

    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

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
