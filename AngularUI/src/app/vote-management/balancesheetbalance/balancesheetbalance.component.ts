import { Component, OnInit } from '@angular/core';
import { BalancesheetBalance } from '../models/BalancesheetBalance';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-balancesheetbalance',
  templateUrl: './balancesheetbalance.component.html',
  styleUrls: ['./balancesheetbalance.component.scss']
})
export class BalancesheetbalanceComponent implements OnInit {
  selectedBalancesheetBalance: BalancesheetBalance = new BalancesheetBalance();
  loading = false;
  APIBalancesheetalancesList:any;
  APIBalancesheettitleList :any;
  APIBalancesheetsubtitleListBybalancetitle :any;
  APIBalancesheetalancesListforvoteidandyear : any;
  TitleID : number=0;
  selectedyear : number =0;
  isSubmitted: boolean = false;
  isValid : boolean;
  APIYearsList : any;
  BalancesheetSubTitleID:any=0;
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
    //this.getAllBalanceSheetBalances();
    this.getAllBalancesheetTitles();
    this.getAllYears();
    //this.getAllBalancesheetBalancesByProgrammeId(26);
    this.loading = false;
  }

  async getAllBalancesheetTitles() {
    this.httpProvider.getAllBalancesheetTitle(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIBalancesheettitleList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.APIBalancesheettitleList = [];
            }
        }}
      });
  }

  async getAllBalancesheetSubtitleByTitleID(id:any) {
    this.httpProvider.getAllBalancesheetSubtitleByTitleID(id).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIBalancesheetsubtitleListBybalancetitle = resultData;
          this.GetAllBalancesheetBalancesForVoteDetailIdandYear();
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIBalancesheetsubtitleListBybalancetitle = [];
            }
        }}
      });
  }


  onchangebalancesheetsubtitle(id : any)
  {
    this.BalancesheetSubTitleID=id;
    this.GetAllBalancesheetBalancesForVoteDetailIdandYear();
  }
  
  onchangeYear(year : any)
  {
    this.selectedyear = year;
    this.GetAllBalancesheetBalancesForVoteDetailIdandYear();
  }


async getAllBalanceSheetBalances() {
  this.httpProvider.getAllBalancesheetBalance(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBalancesheetalancesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBalancesheetalancesList = [];
          }
      }}
    });
}

async GetAllBalancesheetBalancesForVoteDetailIdandYear() {
  this.httpProvider.GetAllBalancesheetBalancesForVoteDetailIdandYear(this.BalancesheetSubTitleID,this.selectedyear).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBalancesheetalancesListforvoteidandyear = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBalancesheetalancesListforvoteidandyear = [];
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

  async updateRecord() {

    if (this.selectedBalancesheetBalance.voteDetailID == null){
      this.isValid=false; Notify.warning('Vote Detail is required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetBalance.year == null){
      this.isValid=false; Notify.warning('Year is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetBalance.balance == null){
    this.isValid=false; Notify.warning('Balance is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedBalancesheetBalance.id !== undefined) {
      console.log(this.selectedBalancesheetBalance);
    this.httpProvider.updateBalancesheetBalance(this.selectedBalancesheetBalance)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('Income Sub Title Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedBalancesheetBalance.sabhaID=Number(localStorage.getItem('sabhaId'));
      this.selectedBalancesheetBalance.enteredDate = new Date();
      this.selectedBalancesheetBalance.status = 1;
  this.httpProvider.saveBalancesheetBalance(this.selectedBalancesheetBalance)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Balancesheet Balance Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
this.BalancesheetSubTitleID=this.selectedBalancesheetBalance.voteDetailID;
this.selectedyear=this.selectedBalancesheetBalance.year;
this.selectedBalancesheetBalance = new BalancesheetBalance();
this.selectedBalancesheetBalance.voteDetailID=this.BalancesheetSubTitleID;
this.selectedBalancesheetBalance.year=this.selectedyear;
this.GetAllBalancesheetBalancesForVoteDetailIdandYear();

}, 2000);
}
}

  clearRecord() {
    this.selectedBalancesheetBalance = new BalancesheetBalance();
  }

  async deleteBalancesheetBalance(balancesheetBalance: BalancesheetBalance) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete  ${balancesheetBalance.balance }. This cannot be undone.`)) {
      this.httpProvider.deleteBalancesheetBalanceById(balancesheetBalance.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('BalancesheetBalance Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.BalancesheetSubTitleID=this.selectedBalancesheetBalance.voteDetailID;
      this.selectedyear=this.selectedBalancesheetBalance.year;
      this.selectedBalancesheetBalance = new BalancesheetBalance();
      this.selectedBalancesheetBalance.voteDetailID=this.BalancesheetSubTitleID;
      this.selectedBalancesheetBalance.year=this.selectedyear;
      this.GetAllBalancesheetBalancesForVoteDetailIdandYear();
      }, 2000);
  }
}

editBalancesheetBalance(balancesheetBalance: BalancesheetBalance) {
  this.selectedBalancesheetBalance = balancesheetBalance;
}

}


