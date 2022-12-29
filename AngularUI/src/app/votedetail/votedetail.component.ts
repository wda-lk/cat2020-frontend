import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { VoteDetail } from '../models/VoteDetail';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AnyAaaaRecord } from 'dns';
import { Programme } from 'app/models/programme';

@Component({
  selector: 'app-votedetail',
  templateUrl: './votedetail.component.html',
  styleUrls: ['./votedetail.component.scss']
})
export class VotedetailComponent implements OnInit {
  selectedVoteDetail: VoteDetail = new VoteDetail();
  programme: Programme = new Programme();
  loading = false;
  
  isSubmitted: boolean = false;
  isValid : boolean;
  ProgrammeID:number;
  ProjectID:number;
  IncomeTitleID:number;
  IncomeSubTitleID:number;
  VoteCode :any;

  APIVoteDetailsList:any;
  APIVoteDetailsForProgrammeList:any;
  APIProgrammesList :any;
  APIProjectsListByProgramme :any;
  APISubProjectsByProject :any;
  APIIncomeTitleListByProgramme :any;
  APIIncomeSubTitleListByTitle :any;
  
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
    //this.getAllVoteDetailsByProgrammeId(26);
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

  async getAllProjects() {
    this.httpProvider.getAllProject(localStorage.getItem('sabhaId')).subscribe({
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

async getAllVoteDetails() {
  this.httpProvider.getAllVoteDetails(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteDetailsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteDetailsList = [];
          }
      }}
    });
}

async getAllVoteDetailsForProgrammeId(id : any) {
  this.httpProvider.getAllVoteDetailsForProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteDetailsForProgrammeList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteDetailsForProgrammeList = [];
          }
      }}
    });
}



async LoadProjectsandIncomeTitles(id : any) {
  console.log(id);
  // this.APIProgrammesList[index];

  const ids = this.APIProgrammesList.map((programme) => programme.code).filter(c => c.id=id);
  
  console.log(ids);
  // let id : any=this.APIProgrammesList[index].id;
  let index = this.APIProgrammesList.indexOf(id); 
  // let index = this.APIProgrammesList.index(x => x.id === id);
  // let code : any=this.APIProgrammesList[index].code;
  console.log(index);
  // this.VoteCode=localStorage.getItem('sabhaCode')+"-"+this.APIProgrammesList[index].code;
  // console.log(this.VoteCode);
  this.getAllProjectsByProgrammeId(id);
  this.getAllIncomeTitlesByProgrammeId(id);
  
  //to load the table when selecting programmes drop down only
  // this.getAllVoteDetailsForProgrammeId(id);
}

async getAllProjectsByProgrammeId(id : any) {
  this.httpProvider.getAllProjectsForProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIProjectsListByProgramme = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIProjectsListByProgramme = [];
          }
      }}
    });
}

async getAllSubProjectsByProjectId(id : any) {
  this.httpProvider.getAllsubprojectforprojectID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APISubProjectsByProject = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APISubProjectsByProject = [];
          }
      }}
    });
}


async getAllIncomeTitlesByProgrammeId(id : any) {
  this.httpProvider.getAllIncometitleByProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeTitleListByProgramme = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeTitleListByProgramme = [];
          }
      }}
    });
}

async getAllIncomeSubTitlesByIncomeTitleID(id : any) {
  this.httpProvider.getAllIncomeSubtitlebyTitleID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeSubTitleListByTitle = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeSubTitleListByTitle = [];
          }
      }}
    });
}



  async updateRecord() {

    if (this.selectedVoteDetail.programmeID == null){
      this.isValid=false; Notify.warning('Please select a Programme.');
    } else{this.isValid=true;}

    if (this.selectedVoteDetail.projectID == null){
      this.isValid=false; Notify.warning('Please select a Project.');
    } else{this.isValid=true;}


    if (this.selectedVoteDetail.subprojectID == null){
      this.isValid=false; Notify.warning('Please select a Sub Project.');
    } else{this.isValid=true;}


    if (this.selectedVoteDetail.incomeTitleID == null){
      this.isValid=false; Notify.warning('Please select a Income Title.');
    } else{this.isValid=true;}

    if (this.selectedVoteDetail.incomeSubtitleID == null){
      this.isValid=false; Notify.warning('Please select a Income Subtitle.');
    } else{this.isValid=true;}

    if (this.selectedVoteDetail.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedVoteDetail.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedVoteDetail.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedVoteDetail.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedVoteDetail.id !== undefined) {
    this.httpProvider.updateVoteDetails(this.selectedVoteDetail)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('Income Vote Detail Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedVoteDetail.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedVoteDetail.status = 1;

      this.selectedVoteDetail.programmeNameSinhala = null;
      this.selectedVoteDetail.programmeNameEnglish = null;
      this.selectedVoteDetail.programmeNameTamil = null;
      this.selectedVoteDetail.programmeCode = null;
      this.selectedVoteDetail.projectNameSinhala = null;
      this.selectedVoteDetail.projectNameEnglish = null;
      this.selectedVoteDetail.projectNameTamil = null;
      this.selectedVoteDetail.projectCode = null;
      this.selectedVoteDetail.subprojectNameSinhala = null;
      this.selectedVoteDetail.subprojectNameEnglish = null;
      this.selectedVoteDetail.subprojectNameTamil = null;
      this.selectedVoteDetail.subprojectCode = null;
      this.selectedVoteDetail.incomeTitleNameSinhala = null;
      this.selectedVoteDetail.incomeTitleNameEnglish = null;
      this.selectedVoteDetail.incomeTitleNameTamil = null;
      this.selectedVoteDetail.incomeTitleCode = null;
      this.selectedVoteDetail.incomeSubtitleNameSinhala = null;
      this.selectedVoteDetail.incomeSubtitleNameEnglish = null;
      this.selectedVoteDetail.incomeSubtitleNameTamil = null;
      this.selectedVoteDetail.incomeSubtitleCode = null;
      this.selectedVoteDetail.incomeOrExpense  = null;

  this.httpProvider.saveVoteDetails(this.selectedVoteDetail)
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
this.selectedVoteDetail = new VoteDetail();
this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedVoteDetail = new VoteDetail();
  }

  async deleteVoteDetail(voteDetail: VoteDetail) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${voteDetail.code + "::" + voteDetail.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteVoteDetailsById(voteDetail.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             setTimeout(() => {this.refresh();}, 2000);
             Notify.success('VoteDetail Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedVoteDetail = new VoteDetail();
      this.refresh();
      }, 1000);
  }
}

editVoteDetail(voteDetail: VoteDetail) {
  this.selectedVoteDetail = voteDetail;
}

}


