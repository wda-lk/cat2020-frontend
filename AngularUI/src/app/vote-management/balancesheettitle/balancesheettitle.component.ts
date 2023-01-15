import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { BalancesheetTitle } from '../models/BalancesheetTitle';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-balancesheettitle',
  templateUrl: './balancesheettitle.component.html',
  styleUrls: ['./balancesheettitle.component.scss']
})
export class BalancesheettitleComponent implements OnInit {
  selectedBalancesheetTitle: BalancesheetTitle = new BalancesheetTitle();
  loading = false;
  APIBalancesheetTitlesList:any;
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
    this.getAllBalancesheetTitles();
    this.loading = false;
  }

async getAllBalancesheetTitles() {
  this.httpProvider.getAllBalancesheetTitle(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBalancesheetTitlesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBalancesheetTitlesList = [];
          }
      }}
    });
}


  async updateRecord() {

    if (this.selectedBalancesheetTitle.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetTitle.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetTitle.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetTitle.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedBalancesheetTitle.id !== undefined) {
    this.httpProvider.updateBalancesheetTitle(this.selectedBalancesheetTitle)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           console.log(result);
           Notify.success('BalancesheetTitle Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedBalancesheetTitle.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedBalancesheetTitle.status = 1;
  this.httpProvider.saveBalancesheetTitle(this.selectedBalancesheetTitle)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         console.log(result);
         setTimeout(() => {this.refresh();}, 2000);
         Notify.success('Income Title Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
this.selectedBalancesheetTitle = new BalancesheetTitle();
this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedBalancesheetTitle = new BalancesheetTitle();
  }

  async deleteBalancesheetTitle(balancesheetTitle: BalancesheetTitle) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${balancesheetTitle.code + "::" + balancesheetTitle.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteBalancesheetTitleById(balancesheetTitle.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             setTimeout(() => {this.refresh();}, 2000);
             Notify.success('BalancesheetTitle Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedBalancesheetTitle = new BalancesheetTitle();
      this.refresh();
      }, 1000);
  }
}

editBalancesheetTitle(balancesheetTitle: BalancesheetTitle) {
  this.selectedBalancesheetTitle = balancesheetTitle;
}

}
