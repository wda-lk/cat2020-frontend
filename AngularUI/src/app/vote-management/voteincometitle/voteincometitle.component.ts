import { Component, OnInit } from '@angular/core';
import { IncomeTitle } from '../models/IncomeTitle';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-voteincometitle',
  templateUrl: './voteincometitle.component.html',
  styleUrls: ['./voteincometitle.component.scss']
})
export class VoteincometitleComponent implements OnInit {
  selectedIncomeTitle: IncomeTitle = new IncomeTitle();
  loading = false;
  APIIncomeTitlesList:any;
  APIIncomeTitlesForProgrammeList:any;
  APIProgrammesList :any;
  programmeID :any;
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
    this.getAllProgrammes();
    this.loading = false;
  }

  async getAllProgrammes() {
    this.httpProvider.getAllProgramme(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIProgrammesList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIProgrammesList = [];
            }
        }}
        
      });
      
  }

async getAllIncomeTitles() {
  this.httpProvider.getAllIncometitle(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeTitlesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeTitlesList = [];
          }
      }}
    });
}


async getAllIncomeTitlesByProgrammeId(id : number) {
  this.programmeID=id;
  this.httpProvider.getAllIncometitleByProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeTitlesForProgrammeList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeTitlesForProgrammeList = [];
          }
      }}
    });
}

  async updateRecord() {

    if (this.selectedIncomeTitle.programmeID == null){
      this.isValid=false; Notify.warning('Please select a Programme.');
    } else{this.isValid=true;}

    if (this.selectedIncomeTitle.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedIncomeTitle.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedIncomeTitle.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedIncomeTitle.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedIncomeTitle.id !== undefined) {
    this.httpProvider.updateIncometitle(this.selectedIncomeTitle)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('IncomeTitle Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedIncomeTitle.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedIncomeTitle.status = 1;
  this.httpProvider.saveIncometitle(this.selectedIncomeTitle)
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
this.selectedIncomeTitle = new IncomeTitle();
this.selectedIncomeTitle.programmeID=this.programmeID;
this.getAllIncomeTitlesByProgrammeId(this.programmeID) ;
// this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedIncomeTitle = new IncomeTitle();
  }

  async deleteIncomeTitle(incomeTitle: IncomeTitle) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${incomeTitle.code + "::" + incomeTitle.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteIncometitleById(incomeTitle.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
            //  setTimeout(() => {this.refresh();}, 2000);
             Notify.success('IncomeTitle Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
       this.selectedIncomeTitle = new IncomeTitle();
       this.selectedIncomeTitle.programmeID=this.programmeID;
      this.getAllIncomeTitlesByProgrammeId(this.programmeID) ;
      }, 1000);
  }
}

editIncomeTitle(incomeTitle: IncomeTitle) {
  this.selectedIncomeTitle = incomeTitle;
}

}
