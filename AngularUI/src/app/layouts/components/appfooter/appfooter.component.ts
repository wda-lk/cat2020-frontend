import { Component } from '@angular/core';
import { AuthenticationService } from '../../../system-security/_services';

@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.scss']
})
export class AppfooterComponent {
  constructor(private authenticationService: AuthenticationService) { }

  logopath: any;
  isLoggedIn: boolean; 
  ngOnInit() {
    if (this.authenticationService.userValue) { 
      this.isLoggedIn=true;
    }
    this.logopath = localStorage.getItem('CurrentLogopathNm');
  }
}
