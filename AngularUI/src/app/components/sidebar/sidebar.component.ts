import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

declare interface VoteManagementMainFromsRouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

declare interface UserManagementMainFromsRouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

declare interface VoteManagementAllocaionFromsRouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [

 { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },

  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/typography', title: 'Create User',  icon:'key', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
]

//Vote Managament Sub Menus
export const VOTEMANAGEMENTMAINFORMSROUTES: VoteManagementAllocaionFromsRouteInfo[] = [

  { path: '/programmes', title: 'Programmes',  icon:'assignment_turned_in', class: '' },
  { path: '/voteincometitle', title: 'Vote Income Titles',  icon:'assignment_turned_in', class: '' }, 
  { path: '/voteincomesubtitle', title: 'Vote Income Sub Titles',  icon:'assignment_turned_in', class: '' }, 
  { path: '/voteincomeproject', title: 'Vote Income Projects',  icon:'assignment_turned_in', class: '' }, 
  { path: '/voteincomesubproject', title: 'Vote Income Sub Projects',  icon:'assignment_turned_in', class: '' }, 
  
  { path: '/balancesheettitle', title: 'Balancesheet Title',  icon:'assignment_turned_in', class: '' },
  { path: '/balancesheetsubtitle', title: 'Balancesheet Sub Titles',  icon:'assignment_turned_in', class: '' }, 

  { path: '/votedetail', title: 'Vote Details',  icon:'view_list', class: '' }, 
  { path: '/accountdetail', title: 'Account Details',  icon:'monetization_on', class: '' },
]

export const VOTEMANAGEMENTALLOCATIONFORMSROUTES: VoteManagementMainFromsRouteInfo[] = [

  { path: '/accountbalancedetail', title: 'Account Balance Details',  icon:'monetization_on', class: '' }, 
  { path: '/voteallocation', title: 'Vote Allocations',  icon:'attach_money', class: '' }, 
  { path: '/balancesheetbalance', title: 'Balancesheet Balances',  icon:'attach_money', class: '' }
]
export const USERMANAGEMENTALLOCATIONFORMSROUTES: UserManagementMainFromsRouteInfo[] = [

  { path: '/new-user', title: 'Users',  icon:'person', class: '' }, 
  { path: '/user-detail', title: 'User Details',  icon:'person', class: '' }, 
  
]
//end of Vote Managament Sub Menus


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  voteManagementMainFormsMenuItems: any[];
  voteManagementAllocationFormsMenuItems: any[];
  userManagementAllocationFormsMenuItems: any[];

  constructor(private authenticationService: AuthenticationService) { }

  logopath: any;
  ngOnInit() {
    this.logopath = localStorage.getItem('CurrentLogopathNm');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.voteManagementMainFormsMenuItems = VOTEMANAGEMENTMAINFORMSROUTES.filter(menuItem => menuItem);
    this.voteManagementAllocationFormsMenuItems = VOTEMANAGEMENTALLOCATIONFORMSROUTES.filter(menuItem => menuItem);
    this.userManagementAllocationFormsMenuItems = USERMANAGEMENTALLOCATIONFORMSROUTES.filter(menuItem => menuItem);

    (function($){
	$(document).ready(function(){
		$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
			event.preventDefault(); 
			event.stopPropagation(); 
			$(this).parent().siblings().removeClass('open');
			$(this).parent().toggleClass('open');
		});
	});
})(jQuery);

  }

  logout() {
    this.authenticationService.logout();
}
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
