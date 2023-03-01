import { Component } from '@angular/core';
import { AuthenticationService } from '../../../system-security/_services';
import { SystemUser } from '../../../system-security/_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpProviderService } from '../../../services/http-provider.service';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent {
  systemuser?: SystemUser | null;
  isLoggedIn: boolean; 
  constructor(private httpProvider: HttpProviderService, private router: Router,private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.systemuser = x);
  }

  SbhName:any;
  OfficeID:any;
  OfficeName:any;
  OfficeType:any;
  UserNm: any;
  DistNm : any;
  ProvNm: any;
  UserNameWithInitials : any;
  SabhaCode : any;
  SelectedLanguage : any;
  SelectedLanguageId : any;
  APIOffice:any;

  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  ngOnInit(){

    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}


    if (this.authenticationService.userValue) { 
      this.isLoggedIn=true;
    }
      this.UserNm = localStorage.getItem('CurrentUserNm'); 
      this.SbhName = localStorage.getItem('CurrentSabhaNameEnglish');
      this.OfficeID = localStorage.getItem('CurrentOfficeId');
      this.SabhaCode = localStorage.getItem('sabhaCode');
      this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
      this.SelectedLanguageId = localStorage.getItem('CurrentSabhaLangId');
      this.DistNm = localStorage.getItem('CurrentDistrictNm');
      this.ProvNm = localStorage.getItem('CurrentProvinceNm');
      this.UserNameWithInitials = localStorage.getItem('CurrentUserNamewithinitials');

      this.getOfficeById(this.OfficeID);
    }

    
    logout() {
      this.authenticationService.logout();
  }

  async getOfficeById(OfficeID :number) {
    this.httpProvider.getOfficeById(OfficeID).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIOffice= resultData;



          if (this.SelectedLanguage=="Sinhala")
          {
            if(this.APIOffice.officeTypeID==1)
            {
            this.OfficeName=this.APIOffice.nameSinhala + '(Main)';
            }
            else{
              this.OfficeName=this.APIOffice.nameSinhala + '(Sub)';
            }
          }

          if (this.SelectedLanguage=="Tamil")
          {
          if(this.APIOffice.officeTypeID==1)
            {
            this.OfficeName=this.APIOffice.nameTamil + '(Main)';
            }
            else{
              this.OfficeName=this.APIOffice.nameTamil + '(Sub)';
            }
          }
          if (this.SelectedLanguage=="English")
          {
            if(this.APIOffice.officeTypeID==1)
            {
            this.OfficeName=this.APIOffice.nameEnglish + '(Main)';
            }
            else{
              this.OfficeName=this.APIOffice.nameEnglish + '(Sub)';
            }
          }
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              // Notify.failure(error.error.message);
              this.APIOffice = [];
            }
        }}
      });
  }
  

}
