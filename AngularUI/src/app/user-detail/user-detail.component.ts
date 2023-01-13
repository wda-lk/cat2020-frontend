import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {formatDate} from '@angular/common';
import { NewUser } from '../models/newUser';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
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
   
  constructor(private httpProvider: HttpProviderService) {
  }

  ngOnInit() {
    this.refresh();
  }


  async refresh() {
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

  // onFileChange(event:any) {
  //   const reader = new FileReader();
    
  //   if(event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
    
  //     reader.onload = () => {
   
  //       this.imageSrc = reader.result as string;
     
  //       this.myForm.patchValue({
  //         fileSource: reader.result
  //       });
   
  //     };
   
  //   }
  // }

  
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


  async updateRecord() {

    if (this.selectedUserDetail.nameInFull == null){
      this.isValid=false; Notify.warning('Full Name is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.nameWithInitials == null){
      this.isValid=false; Notify.warning('Name with Initials is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.nic == null){
      this.isValid=false; Notify.warning('NIC is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.birthday == null){
      this.isValid=false; Notify.warning('Date of Birth is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.contactNo == null){
      this.isValid=false; Notify.warning('Contact Number is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.username == null){
      this.isValid=false; Notify.warning('Email is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.password != this.confirmpassword){
      this.isValid=false; Notify.warning('Passwords does not match.');
    } else
    
    {

    if (this.selectedUserDetail.q1Id == null){
      this.isValid=false; Notify.warning('Please select Question 1.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.answer1 == null){
      this.isValid=false; Notify.warning('Question 1 Answer is Required.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.q2Id == null){
      this.isValid=false; Notify.warning('Please select Question 2.');
    } else{this.isValid=true;}

    if (this.selectedUserDetail.answer2 == null){
      this.isValid=false; Notify.warning('Question 2 Answer is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
      this.httpProvider.saveUser(this.selectedUserDetail)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('User detail Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
    //  Notify.success('Not a valid user.');
setTimeout(() => {
this.selectedUserDetail = new NewUser();
this.refresh();
}, 1000);
}
}
}

editUserDetail(userDetail: NewUser) {
  this.selectedUserDetail = userDetail;
}

}
