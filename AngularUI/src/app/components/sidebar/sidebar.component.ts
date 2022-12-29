import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },

  { path: '/programmes', title: 'Programmes',  icon:'content_paste', class: '' },
  { path: '/voteincometitle', title: 'Vote Income Titles',  icon:'content_paste', class: '' }, 
  { path: '/voteincomesubtitle', title: 'Vote Income Sub Titles',  icon:'content_paste', class: '' }, //to test
  { path: '/voteincomeproject', title: 'Vote Income Projects',  icon:'class', class: '' }, //to test
  { path: '/voteincomesubproject', title: 'Vote Income Sub Projects',  icon:'class', class: '' }, //to test
  
  { path: '/balancesheettitle', title: 'Balancesheet Title',  icon:'content_paste', class: '' },
  { path: '/balancesheetsubtitle', title: 'Balancesheet Sub Titles',  icon:'content_paste', class: '' }, 

  { path: '/votedetail', title: 'Vote Details',  icon:'content_paste', class: '' }, //to test

  { path: '/accountdetail', title: 'Account Details',  icon:'class', class: '' }, //to test
  { path: '/accountbalancedetail', title: 'Account Balance Details',  icon:'class', class: '' }, //to test
  
  { path: '/voteallocation', title: 'Vote Allocations',  icon:'class', class: '' }, //to test
  { path: '/balancesheetbalance', title: 'Balancesheet Balances',  icon:'class', class: '' }, //to test
 

  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/typography', title: 'Create User',  icon:'key', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
]
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  logopath: any;
  ngOnInit() {
    this.logopath = localStorage.getItem('CurrentLogopathNm');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
