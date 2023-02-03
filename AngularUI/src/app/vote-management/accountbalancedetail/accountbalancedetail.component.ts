import { Component, OnInit } from '@angular/core';
import { AccountBalanceDetail } from '../models/AccountBalanceDetail';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-accountbalancedetail',
  templateUrl: './accountbalancedetail.component.html',
  styleUrls: ['./accountbalancedetail.component.scss']
})
export class AccountbalancedetailComponent implements OnInit {
  selectedAccountbalancedetail: AccountBalanceDetail = new AccountBalanceDetail();
  loading = false;
  APIAccountbalancedetailsList:any;
  APIAccountbalancedetailsListByAccountId : any;
  APIAccountdetailsList :any;
  APIYearsList :any;
  isSubmitted: boolean = false;
  isValid : boolean;
  objSelectedAccountDetail:any;

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
    // this.getAllAccountbalancedetails();
    this.getAllAccountdetails();
    this.getAllYears();
    this.loading = false;
  }

  async getAllAccountdetails() {
    this.httpProvider.getAllAccountDetail(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIAccountdetailsList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIAccountdetailsList = [];
            }
        }}
      });
  }

  async getAllYears() {
    this.httpProvider.getAllYears().subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIYearsList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIYearsList = [];
            }
        }}
      });
  }

async getAllAccountbalancedetails() {
  this.httpProvider.getAllAccountBalanceDetail(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAccountbalancedetailsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAccountbalancedetailsList = [];
          }
      }}
    });
}

async getAllAccountbalancedetailsByAccountId(id :any) {

  this.objSelectedAccountDetail=null;
  this.objSelectedAccountDetail = this.APIAccountdetailsList.find((obj :any) => obj.id == id);

  this.httpProvider.getAllAccountbalancedetailsByAccountIdandSabhaId(id,localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAccountbalancedetailsListByAccountId = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAccountbalancedetailsListByAccountId = [];
          }
      }}
    });
}


// async getAllAccountbalancedetailsByAccountdetailId(id : number) {
//   this.httpProvider.getAllAccountBalanceDetailByAccountdetailId(id).subscribe({
//     next: (data) => {
//     if (data != null && data.body != null) {
//       var resultData = data.body;
//       if (resultData) {
//         this.APIAccountbalancedetailsList = resultData;
//       }
//     }
//   },
//   error: error => {
//         if (error.status == 404) {
//           if(error.error && error.error.message){
//             Notify.failure(error.error.message);
//             this.APIAccountbalancedetailsList = [];
//           }
//       }}
//     });
// }

  async updateRecord() {

    if (this.selectedAccountbalancedetail.accountDetailID == null){
      this.isValid=false; Notify.warning('Please select a Accountdetail.');
    } else{this.isValid=true;}

    if (this.selectedAccountbalancedetail.year == null){
      this.isValid=false; Notify.warning('Year is Required.');
    } else{this.isValid=true;}

    if (this.selectedAccountbalancedetail.balanceAmount == null){
      this.isValid=false; Notify.warning('Balance amount is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedAccountbalancedetail.id !== undefined) {
    this.httpProvider.updateAccountBalanceDetail(this.selectedAccountbalancedetail)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('Account balance detail Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedAccountbalancedetail.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedAccountbalancedetail.status = 1;
      this.selectedAccountbalancedetail.enteredDate = new Date();
      
  this.httpProvider.saveAccountBalanceDetail(this.selectedAccountbalancedetail)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Income Title Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
  this.selectedAccountbalancedetail = new AccountBalanceDetail();
        this.selectedAccountbalancedetail.accountDetailID=this.objSelectedAccountDetail.id;
        this.getAllAccountbalancedetailsByAccountId(this.objSelectedAccountDetail.id) ;
}, 1000);
}
}

  clearRecord() {
    this.selectedAccountbalancedetail = new AccountBalanceDetail();
  }

  async deleteAccountbalancedetail(accountbalancedetail: AccountBalanceDetail) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete ${accountbalancedetail.balanceAmount}. This cannot be undone.`)) {
      this.httpProvider.deleteAccountBalanceDetailById(accountbalancedetail.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('Account balance detail Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedAccountbalancedetail = new AccountBalanceDetail();
        this.selectedAccountbalancedetail.accountDetailID=this.objSelectedAccountDetail.id;
        this.getAllAccountbalancedetailsByAccountId(this.objSelectedAccountDetail.id) ;
      }, 1000);
  }
}

editAccountbalancedetail(accountbalancedetail: AccountBalanceDetail) {
  this.selectedAccountbalancedetail = accountbalancedetail;
}

}
