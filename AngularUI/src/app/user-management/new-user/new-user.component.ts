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
this.model.sabhaID=Number(localStorage.getItem('sabhaId'));
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

setTimeout(() => {
this.model = new NewUser();
this.getAllUsers();
}, 2000);
// await this.refresh();
// }
}
}

