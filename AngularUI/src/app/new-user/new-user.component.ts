import { Component } from '@angular/core';
import { NewUser } from 'app/models/newUser';
import { HttpProviderService } from 'app/services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  model : NewUser = new  NewUser();
  UserList:any;

  constructor(private httpProvider: HttpProviderService) {
  }
  
  ngOnInit() {
    this.getAllUsers();
  }
  
async getAllUsers() {
  this.httpProvider.getAllUsers(Number(localStorage.getItem('sabhaId'))).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.UserList = resultData;
        console.log(resultData);
      
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
  console.log(this.model.id)
  // this.isSubmitted = true;
  if (this.model.username==null || this.model.username==undefined){
    Notify.warning('User ID is Required.');
    return;
  } 
  this.model.sabhaID=Number(localStorage.getItem('sabhaId'));
  if(this.model.id!=undefined){
  this.httpProvider.updateUser(this.model)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         console.log(result);
         Notify.success('User Updated successfully..!');
    },
    error: error => {
       Notify.failure('Error Occured..!');
    }
});
}
 
else {
this.httpProvider.saveUser(this.model)
.subscribe({
  next: (result) => {
       var resultData = result.body;
       console.log(result);
       Notify.success('User Created successfully..!');
  },
  error: error => {
    Notify.failure('Error Occured..!');
  }
});
}
setTimeout(() => {
this.model = new NewUser();
this.getAllUsers();
}, 2000);
// await this.refresh();
// }
}
}

