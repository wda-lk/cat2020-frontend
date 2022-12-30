import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { BalancesheetBalance } from '../models/BalancesheetBalance';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AnyAaaaRecord } from 'dns';
import { Programme } from 'app/models/programme';

@Component({
  selector: 'app-balancesheetbalance',
  templateUrl: './balancesheetbalance.component.html',
  styleUrls: ['./balancesheetbalance.component.scss']
})
export class BalancesheetbalanceComponent implements OnInit {
  selectedBalancesheetBalance: BalancesheetBalance = new BalancesheetBalance();
  programme: Programme = new Programme();
  loading = false;
  APIBalancesheetalancesList:any;
  APIBalancesheettitleList :any;
  APIBalancesheetsubtitleListBybalancetitle :any;
  TitleID : number;
  isSubmitted: boolean = false;
  isValid : boolean;
  APIYearsList : any;
  IncomeSubTitleID:any;
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
    this.getAllBalanceSheetBalances();
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

  async getAllBalancesheetSubtitleByTitleID() {
    this.httpProvider.getAllBalancesheetSubtitleByTitleID(this.TitleID).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIBalancesheetsubtitleListBybalancetitle = resultData;
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
      this.selectedBalancesheetBalance.enteredDate = new Date();
      this.selectedBalancesheetBalance.status = 1;
  this.httpProvider.saveBalancesheetBalance(this.selectedBalancesheetBalance)
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
this.selectedBalancesheetBalance = new BalancesheetBalance();
this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedBalancesheetBalance = new BalancesheetBalance();
  }

  async deleteBalancesheetBalance(subProject: BalancesheetBalance) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete  ${subProject.balance }. This cannot be undone.`)) {
      this.httpProvider.deleteSubprojectById(subProject.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             setTimeout(() => {this.refresh();}, 2000);
             Notify.success('BalancesheetBalance Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedBalancesheetBalance = new BalancesheetBalance();
      this.refresh();
      }, 1000);
  }
}

editBalancesheetBalance(subProject: BalancesheetBalance) {
  this.selectedBalancesheetBalance = subProject;
}

}


