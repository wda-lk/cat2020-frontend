import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../system-security/_services';
import { HttpProviderService } from '../../../services/http-provider.service';
import { environment } from '../../../../environments/environment';
var apiUrl = environment.apiUrl;

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})
export class AppmenuComponent {

  constructor(private httpProvider: HttpProviderService, private authenticationService: AuthenticationService, private _http : HttpClient) { }

  logopath: any;
  isLoggedIn: boolean=false;
  isAllowed: boolean=false;
  isDeveloper: boolean=false;
  isadmin:boolean=false;
  haspermission:boolean;

  ruleList:any;
  assignedruleList :any = new Array();

  ngOnInit() {
    if(Number(localStorage.getItem('IsAdmin'))==1)
   {this.isadmin=true;}
    this.getAllRulesForUser(Number(localStorage.getItem('Currentuserid')));

    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}

    if (this.authenticationService.userValue!=null) { 
      this.isLoggedIn=true;
    }
    this.logopath = localStorage.getItem('CurrentLogopathNm');

    if (String(localStorage.getItem('CurrentUserNm'))=="lahiru@cat20.lk")
    this.isDeveloper = true;

    if (String(localStorage.getItem('CurrentUserNm'))=="adminkuru@cat20.lk")
    this.isDeveloper = true;

    if (String(localStorage.getItem('CurrentUserNamewithinitials')).length>4)
    this.isAllowed = true;
  }

  logout() {
    this.authenticationService.logout();
}

hasPermission(rulecode :string) 
{
  if(this.isadmin)
  {
  return true;
  }
else{
  let rules :any = localStorage.getItem('ruleList');
  this.ruleList = JSON.parse(rules);

  if(this.ruleList!=undefined){
  return this.searchInArray(rulecode,this.ruleList);}
  return false;
}
  return false;
}

searchInArray(nameKey:any, myArray:any){
  for (let i=0; i < myArray.length; i++) {
      if (myArray[i].code === nameKey) {
          // return myArray[i];
          return true
      }
  }
  return false;
}

async checkPermission(ruleCode:any,userId:Number) {
  this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
    next: (data) => {
      this.haspermission = Boolean(data.body);
      localStorage.setItem('assignedrule', String(this.haspermission));
       // console.log('haspermission : '+this.haspermission);
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
          }
      }}
    });
}

async getAllRulesForUser(userID:number) {
  this.httpProvider.getPermittedRulesForUser(userID).subscribe({
    next: (data) => {
      localStorage.setItem('ruleList', JSON.stringify(data.body));
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            this.ruleList = [];
          }
      }}
    });
}

}



