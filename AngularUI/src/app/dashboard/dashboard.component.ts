import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewUser } from '../user-management/models/newUser';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../system-security/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedUserDetail: NewUser = new NewUser();
  loading = false;
  APIUserDetailsList:any;
  APIQuestionsList :any;
  APIGenderList :any;
  confirmpassword :any;
  isSubmitted: boolean = false;
  isValid : boolean;
  birthday: any;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;
  isNewUser:boolean=true;
   
  constructor(private datepipe: DatePipe,private httpProvider: HttpProviderService,private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.refresh();
  }


  async refresh() {
    if (String(localStorage.getItem('CurrentUserNamewithinitials')).length>4) {
    this.isNewUser =false;
    } else
    {
      this.isNewUser =true;
    }
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}
    
    this.loading = true;
    this.isValid = false;
    this.getUserDetailbyId();
    this.getAllSecurityQuestions();
    this.getAllGenders();
    this.loading = false;
  }

  async getAllSecurityQuestions() {
    this.httpProvider.getAllSecurityQuestions().subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIQuestionsList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIQuestionsList = [];
            }
        }}
        
      });
  }

  async getAllGenders() {
    this.httpProvider.getAllGenders().subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIGenderList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIGenderList = [];
            }
        }}
        
      });
  }


async getUserDetailbyId() {
  this.httpProvider.getUserById(localStorage.getItem('Currentuserid')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIUserDetailsList = resultData;
        this.editUserDetail(resultData);
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIUserDetailsList = [];
          }
      }}
    });
}


//   async updateRecord() {

//     if (this.selectedUserDetail.nameInFull != null && this.selectedUserDetail.nameInFull != "" ){
//     } else{
//       this.isValid=false; Notify.warning('Full Name is Required.');}

//     if (this.selectedUserDetail.nameWithInitials != null && this.selectedUserDetail.nameWithInitials != ""){
//     } else{this.isValid=false; Notify.warning('Name with Initials is Required.');}

//     if (this.selectedUserDetail.nic != null && this.selectedUserDetail.nic != "") {
//     } else{this.isValid=false; Notify.warning('NIC is Required.');}

//     if (this.selectedUserDetail.birthday == null){
//       this.isValid=false; Notify.warning('Date of Birth is Required.');
//     } else if (this.selectedUserDetail.contactNo == null){
//       this.isValid=false; Notify.warning('Contact Number is Required.');
//     } else if (this.selectedUserDetail.q1Id == null){
//       this.isValid=false; Notify.warning('Please select Question 1.');
//     } else if (this.selectedUserDetail.answer1 == null){
//       this.isValid=false; Notify.warning('Question 1 Answer is Required.');
//     } else if (this.selectedUserDetail.q2Id == null){
//       this.isValid=false; Notify.warning('Please select Question 2.');
//     } else if (this.selectedUserDetail.answer2 == null){
//       this.isValid=false; Notify.warning('Question 2 Answer is Required.');
//     } else{
//       this.isValid=true;
//     }

//     if (this.isValid==true) {
//       this.httpProvider.updateUserDetails(this.selectedUserDetail)
//     .subscribe({
//       next: (result) => {
//            var resultData = result.body;
//            Notify.success('User detail Updated successfully..!');
//       },
//       error: error => {
//          Notify.failure('Error Occured..!');
//       }
//   });
// setTimeout(() => {
// this.selectedUserDetail = new NewUser();
// this.refresh();
// }, 1000);
// }
// }


async updateRecord() {

      if (this.selectedUserDetail.nameInFull != null && this.selectedUserDetail.nameInFull != "" ){
    } else{
      this.isValid=false; Notify.warning('Full Name is Required.');}

    if (this.selectedUserDetail.nameWithInitials != null && this.selectedUserDetail.nameWithInitials != ""){
    } else{this.isValid=false; Notify.warning('Name with Initials is Required.');}

    if (this.selectedUserDetail.nic != null && this.selectedUserDetail.nic != "") {
    } else{this.isValid=false; Notify.warning('NIC is Required.');}

    if (this.selectedUserDetail.birthday == null){
      this.isValid=false; Notify.warning('Date of Birth is Required.');
    } else if (this.selectedUserDetail.contactNo == null){
      this.isValid=false; Notify.warning('Contact Number is Required.');
    } else if (this.selectedUserDetail.q1Id == null){
      this.isValid=false; Notify.warning('Please select Question 1.');
    } else if (this.selectedUserDetail.answer1 == null){
      this.isValid=false; Notify.warning('Question 1 Answer is Required.');
    } else if (this.selectedUserDetail.q2Id == null){
      this.isValid=false; Notify.warning('Please select Question 2.');
    } else if (this.selectedUserDetail.answer2 == null){
      this.isValid=false; Notify.warning('Question 2 Answer is Required.');
    } else{
      this.isValid=true;
    }
  if (this.isValid==true) {
    const customdate  = this.datepipe.transform(this.selectedUserDetail.birthday, 'yyyy-MM-dd');
      this.selectedUserDetail.birthday= new Date(customdate!);
    this.httpProvider.updateUserDetails(this.selectedUserDetail)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('User detail Updated successfully..!');
    },
    error: error => {
       Notify.failure('Error Occured..!');
    }
});
this.authenticationService.logout();
setTimeout(() => {
this.selectedUserDetail = new NewUser();
this.refresh();
}, 1000);
}
}

resetForm() {
  this.selectedUserDetail = new NewUser();
  this.getUserDetailbyId();
}

editUserDetail(userDetail: NewUser) {
  this.selectedUserDetail = userDetail;
}
}
