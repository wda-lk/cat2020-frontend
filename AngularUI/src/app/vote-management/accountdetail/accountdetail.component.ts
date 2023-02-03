import { Component, OnInit } from '@angular/core';
import { AccountDetail } from '../models/AccountDetail';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-accountdetail',
  templateUrl: './accountdetail.component.html',
  styleUrls: ['./accountdetail.component.scss']
})
export class AccountdetailComponent implements OnInit {
  selectedAccountDetail: AccountDetail = new AccountDetail();
  loading = false;
  APIAccountDetailsList:any;
  APIBanksList :any;
  isSubmitted: boolean = false;
  isValid : boolean;

   
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
    this.getAllAccountDetails();
    this.getAllBanks();
    this.loading = false;
  }

  async getAllBanks() {
    this.httpProvider.getAllBankDetails().subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIBanksList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIBanksList = [];
            }
        }}
      });
  }

async getAllAccountDetails() {
  this.httpProvider.getAllAccountDetail(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAccountDetailsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAccountDetailsList = [];
          }
      }}
    });
}


// async getAllAccountDetailsByBankId(id : number) {
//   this.httpProvider.getAllAccountDetailByBankId(id).subscribe({
//     next: (data) => {
//     if (data != null && data.body != null) {
//       var resultData = data.body;
//       if (resultData) {
//         this.APIAccountDetailsList = resultData;
//       }
//     }
//   },
//   error: error => {
//         if (error.status == 404) {
//           if(error.error && error.error.message){
//             Notify.failure(error.error.message);
//             this.APIAccountDetailsList = [];
//           }
//       }}
//     });
// }

  async updateRecord() {

    if (this.selectedAccountDetail.bankID == null){
      this.isValid=false; Notify.warning('Please select a Bank.');
    } else{this.isValid=true;}

    if (this.selectedAccountDetail.accountNo == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.selectedAccountDetail.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedAccountDetail.nameSinhala == null && this.isSinhala==true){
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedAccountDetail.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedAccountDetail.id !== undefined) {
    this.httpProvider.updateAccountDetail(this.selectedAccountDetail)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('AccountDetail Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedAccountDetail.officeID = Number(localStorage.getItem('sabhaId'));
      this.selectedAccountDetail.status = 1;
  this.httpProvider.saveAccountDetail(this.selectedAccountDetail)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         setTimeout(() => {this.refresh();}, 2000);
         Notify.success('Income Title Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
this.selectedAccountDetail = new AccountDetail();
this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedAccountDetail = new AccountDetail();
  }

  async deleteAccountDetail(accountDetail: AccountDetail) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${accountDetail.accountNo + "::" + accountDetail.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteAccountDetailById(accountDetail.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             setTimeout(() => {this.refresh();}, 2000);
             Notify.success('AccountDetail Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedAccountDetail = new AccountDetail();
      this.refresh();
      }, 1000);
  }
}

editAccountDetail(accountDetail: AccountDetail) {
  this.selectedAccountDetail = accountDetail;
}

}
