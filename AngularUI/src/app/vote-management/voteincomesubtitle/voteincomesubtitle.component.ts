import { Component, OnInit } from '@angular/core';
import { IncomeSubtitle } from '../models/IncomeSubtitle';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-voteincomesubtitle',
  templateUrl: './voteincomesubtitle.component.html',
  styleUrls: ['./voteincomesubtitle.component.scss']
})
export class VoteincomesubtitleComponent implements OnInit {
  selectedIncomeSubTitle: IncomeSubtitle = new IncomeSubtitle();
  loading = false;
  APIIncomeSubTitlesList:any;
  APIIncomeSubTitlesForProgrammeList:any;
  APIProgrammesList :any;
  APIIncomeTitlesListByProgramme :any;
  isSubmitted: boolean = false;
  isValid : boolean;
  ProgrammeID:number;
 
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
    // this.getAllIncomeSubTitles();
    this.getAllProgrammes();
    //this.getAllIncomeSubTitlesByProgrammeId(26);
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
              this.APIProgrammesList = [];
            }
        }}
      });
  }

  getAllDataForProgrammeID(id:any)
  {
    console.log(id);
    this.getAllIncomeTitlesByProgrammeId(id);
    this.getAllIncomeSubTitlesForProgramme(id);
  }


  async getAllIncomeTitles(id : any) {
    this.httpProvider.getAllIncometitleByProgrammeId(id).subscribe({
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

async getAllIncomeSubTitles() {
  this.httpProvider.getAllIncomeSubtitle(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeSubTitlesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeSubTitlesList = [];
          }
      }}
    });
}

async getAllIncomeSubTitlesForProgramme(id : any) {
 
  this.httpProvider.getAllIncomeSubtitlebyProgrammeID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeSubTitlesForProgrammeList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeSubTitlesForProgrammeList = [];
          }
      }}
    });
}


async getAllIncomeTitlesByProgrammeId(id : any) {
  this.ProgrammeID=id;
  this.httpProvider.getAllIncometitleByProgrammeId(id).subscribe({
    
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeTitlesListByProgramme = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeTitlesListByProgramme = [];
          }
      }}
    });
}

  async updateRecord() {

    if (this.selectedIncomeSubTitle.incomeTitleID == null){
      this.isValid=false; Notify.warning('Please select a Income Title.');
    } else{this.isValid=true;}

    if (this.selectedIncomeSubTitle.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedIncomeSubTitle.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedIncomeSubTitle.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedIncomeSubTitle.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedIncomeSubTitle.id !== undefined) {
    this.httpProvider.updateIncomeSubtitle(this.selectedIncomeSubTitle)
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
      this.selectedIncomeSubTitle.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedIncomeSubTitle.status = 1;
  this.httpProvider.saveIncomeSubtitle(this.selectedIncomeSubTitle)
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
this.selectedIncomeSubTitle = new IncomeSubtitle();
this.selectedIncomeSubTitle.programmeID=this.ProgrammeID;
this.getAllDataForProgrammeID(this.ProgrammeID) ;
// this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedIncomeSubTitle = new IncomeSubtitle();
  }

  async deleteIncomeSubTitle(incomeSubTitle: IncomeSubtitle) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${incomeSubTitle.code + "::" + incomeSubTitle.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteIncomeSubtitleById(incomeSubTitle.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('IncomeSubTitle Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedIncomeSubTitle = new IncomeSubtitle();
      this.selectedIncomeSubTitle.programmeID=this.ProgrammeID;
      this.getAllDataForProgrammeID(this.ProgrammeID) ;
      }, 1000);
  }
}

editIncomeSubTitle(incomeSubTitle: IncomeSubtitle) {
  this.selectedIncomeSubTitle = incomeSubTitle;
}

}


