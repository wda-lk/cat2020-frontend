import { Component } from '@angular/core';
import { AuthenticationService } from '../../../system-security/_services';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})
export class AppmenuComponent {

  constructor(private authenticationService: AuthenticationService) { }

  logopath: any;
  isLoggedIn: boolean=false;
  isAllowed: boolean=false;

  ngOnInit() {
    if (this.authenticationService.userValue!=null) { 
      this.isLoggedIn=true;
    }
    this.logopath = localStorage.getItem('CurrentLogopathNm');

    if (String(localStorage.getItem('CurrentUserNamewithinitials')).length>4)
    this.isAllowed = true;
    
  }

  logout() {
    this.authenticationService.logout();
}
}



