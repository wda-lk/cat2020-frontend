import { Component } from '@angular/core';
//forlogin
import { AuthenticationService } from './system-security/_services';
import { SystemUser } from './system-security/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CAT2020';

  user?: SystemUser | null;

  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  

  logout() {
      this.authenticationService.logout();
  }
}
