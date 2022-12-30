import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { BalancesheetSubtitle } from '../models/Balancesheetsubtitle';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { thisExpression } from '../../../_node_modules/@babel/types/lib/index-legacy';

@Component({
  selector: 'app-balancesheetsubtitle',
  templateUrl: './balancesheetsubtitle.component.html',
  styleUrls: ['./balancesheetsubtitle.component.scss']
})
export class BalancesheetsubtitleComponent implements OnInit {
  selectedBalancesheetsubtitle: BalancesheetSubtitle = new BalancesheetSubtitle();
  loading = false;
  APIBalancesheetsubtitlesList:any;
  APIBalancesheettitlesList :any;
  isSubmitted: boolean = false;
  isValid : boolean;
  balsheetTitleID : any;

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
    // this.getAllBalancesheetsubtitles();
    this.getAllBalancesheettitles();
    this.loading = false;
  }

  async getAllBalancesheettitles() {
    this.httpProvider.getAllBalancesheetTitle(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIBalancesheettitlesList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIBalancesheettitlesList = [];
            }
        }}
      });
  }

async getAllBalancesheetsubtitles() {
  this.httpProvider.getAllBalancesheetSubtitle(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBalancesheetsubtitlesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBalancesheetsubtitlesList = [];
          }
      }}
    });
}


async getAllBalancesheetSubtitleByTitleID(id:any) {
  this.balsheetTitleID=id;
  this.httpProvider.getAllBalancesheetSubtitleByTitleID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBalancesheetsubtitlesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBalancesheetsubtitlesList = [];
          }
      }}
    });
}


// async getAllBalancesheetsubtitlesByBalancesheettitleId(id : number) {
//   this.httpProvider.getAllBalancesheetSubtitle(id).subscribe({
//     next: (data) => {
//     if (data != null && data.body != null) {
//       var resultData = data.body;
//       if (resultData) {
//         this.APIBalancesheetsubtitlesList = resultData;
//       }
//     }
//   },
//   error: error => {
//         if (error.status == 404) {
//           if(error.error && error.error.message){
//             Notify.failure(error.error.message);
//             this.APIBalancesheetsubtitlesList = [];
//           }
//       }}
//     });
// }

  async updateRecord() {

    if (this.selectedBalancesheetsubtitle.balsheetTitleID == null){
      this.isValid=false; Notify.warning('Please select a Balancesheettitle.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetsubtitle.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetsubtitle.nameSinhala == null && this.isSinhala==true){
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetsubtitle.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedBalancesheetsubtitle.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
      console.log(this.selectedBalancesheetsubtitle);
    if (this.selectedBalancesheetsubtitle.id !== undefined) {
    this.httpProvider.updateBalancesheetSubtitle(this.selectedBalancesheetsubtitle)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           console.log(result);
           Notify.success('Balancesheetsubtitle Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedBalancesheetsubtitle.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedBalancesheetsubtitle.status = 1;
  this.httpProvider.saveBalancesheetSubtitle(this.selectedBalancesheetsubtitle)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         console.log(result);
         Notify.success('Income Title Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
this.selectedBalancesheetsubtitle = new BalancesheetSubtitle();
this.selectedBalancesheetsubtitle.balsheetTitleID=this.balsheetTitleID;
this.getAllBalancesheetSubtitleByTitleID(this.balsheetTitleID);
}, 1000);
}
}

  clearRecord() {
    this.selectedBalancesheetsubtitle = new BalancesheetSubtitle();
  }

  async deleteBalancesheetsubtitle(balancesheetSubtitle: BalancesheetSubtitle) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${balancesheetSubtitle.code + "::" + balancesheetSubtitle.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteBalancesheetSubtitleById(balancesheetSubtitle.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('Balancesheetsubtitle Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedBalancesheetsubtitle = new BalancesheetSubtitle();
      this.selectedBalancesheetsubtitle.balsheetTitleID=this.balsheetTitleID;
      this.getAllBalancesheetSubtitleByTitleID(this.balsheetTitleID);
      }, 1000);
  }
}

editBalancesheetsubtitle(project: BalancesheetSubtitle) {
  this.selectedBalancesheetsubtitle = project;
}

}
