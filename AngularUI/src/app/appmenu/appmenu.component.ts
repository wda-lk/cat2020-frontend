import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})
export class AppmenuComponent {

  constructor(private authenticationService: AuthenticationService) { }

  logopath: any;
  isLoggedIn: boolean=false;

  ngOnInit() {
    if (this.authenticationService.userValue!=null) { 
      this.isLoggedIn=true;
    }
    this.logopath = localStorage.getItem('CurrentLogopathNm');
  }

  logout() {
    this.authenticationService.logout();
}
}



