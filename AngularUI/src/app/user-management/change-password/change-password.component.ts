import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewUser } from '../models/newUser';
import { ChangePassword } from '../models/changePassword';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserDetail } from '../models/UserDetail';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userModel : NewUser = new  NewUser();
  changePasswordModel : ChangePassword = new  ChangePassword();

  constructor(private httpProvider: HttpProviderService) {
  }
  
  ngOnInit() {
    this.getUserDetailbyId();
  }
  

  async getUserDetailbyId() {
    this.httpProvider.getUserById(localStorage.getItem('Currentuserid')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.userModel = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.userModel = new NewUser();
            }
        }}
      });
  }

  clearRecord() {
    this.userModel = new NewUser();
    this.changePasswordModel = new ChangePassword();
    this.getUserDetailbyId();
  }

async saveUser() {
  if ((this.changePasswordModel.password != this.changePasswordModel.confirmpassword)){
    Notify.warning('Passwords do not match.');
  } else if (this.changePasswordModel.password=="")
  {
    Notify.warning('Passwords cannot be blank.');
  }
  else
  {
    this.userModel.password=this.changePasswordModel.password;
    this.httpProvider.updateUserDetails(this.userModel).subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Password Changed successfully..!');
    },
    error: error => {
       Notify.failure('Error Occured..!');
    }
});
setTimeout(() => {
this.userModel = new NewUser();
this.changePasswordModel = new ChangePassword();
}, 1000);
}
}
}
