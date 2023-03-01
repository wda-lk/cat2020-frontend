import { Component } from '@angular/core';
import { NewUser } from '../models/newUser';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  model : NewUser = new  NewUser();
  UserList:any;
  APIOfficesList : any;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  constructor(private httpProvider: HttpProviderService) {
  }
  isadmin:boolean=false;
  ngOnInit() {
    this.checkPermission("NEWUSERADDEDIT", Number(localStorage.getItem('Currentuserid')));
    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    this.getAllUsers();
    this.getAllOffices();
  }
  
  haspermission :Boolean;

  async checkPermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.haspermission = Boolean(data.body);
          console.log('haspermission : '+this.haspermission);
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
            }
        }}
      });
  }

async getAllUsers() {
  this.httpProvider.getAllUsers(Number(localStorage.getItem('sabhaId'))).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.UserList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.UserList = [];
          }
      }}
    });
}

async saveUser() {
  this.model.sabhaID=Number(localStorage.getItem('sabhaId'));
this.httpProvider.saveUser(this.model)
.subscribe({
  next: (result) => {
       var resultData = result.body;
       Notify.success('User Created successfully..!');
  },
  error: error => {
    Notify.failure('Error Occured..!');
  }
});

setTimeout(() => {
this.model = new NewUser();
this.getAllUsers();
}, 2000);
// await this.refresh();
// }
}

onchangeOffice(id:any)
{
this.model.officeID=id;
}

async getAllOffices() {
  this.httpProvider.getAllOfficesForSabhaId(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIOfficesList = resultData;
      }
      console.log(this.APIOfficesList );
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIOfficesList = [];
          }
      }}
    });
}


}

