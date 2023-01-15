import { Component } from '@angular/core';
import { AuthenticationService } from '../../../system-security/_services';
import { SystemUser } from '../../../system-security/_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent {
  systemuser?: SystemUser | null;
  isLoggedIn: boolean; 
  constructor(private router: Router,private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.systemuser = x);
  }

  SbhName:any;
  UserNm: any;
  DistNm : any;
  ProvNm: any;
  UserNameWithInitials : any;
  SabhaCode : any;
  SelectedLanguage : any;
  SelectedLanguageId : any;

  

  ngOnInit(){
    if (this.authenticationService.userValue) { 
      this.isLoggedIn=true;
    }
      this.UserNm = localStorage.getItem('CurrentUserNm'); 
      this.SbhName = localStorage.getItem('CurrentSabhaNm');
      this.SabhaCode = localStorage.getItem('sabhaCode');
      this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
      this.SelectedLanguageId = localStorage.getItem('CurrentSabhaLangId');
      this.DistNm = localStorage.getItem('CurrentDistrictNm');
      this.ProvNm = localStorage.getItem('CurrentProvinceNm');
      this.UserNameWithInitials = localStorage.getItem('CurrentUserNamewithinitials');
    }

    logout() {
      this.authenticationService.logout();
  }
}
