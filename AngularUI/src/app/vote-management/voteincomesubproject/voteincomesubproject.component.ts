import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { SubProject } from '../models/SubProject';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-voteincomesubproject',
  templateUrl: './voteincomesubproject.component.html',
  styleUrls: ['./voteincomesubproject.component.scss']
})
export class VoteincomesubprojectComponent implements OnInit {
  selectedSubProject: SubProject = new SubProject();
  loading = false;
  APISubProjectsList:any;
  APIProgrammesList :any;
  APIProjectsListByProgramme :any;
  APISubProjectsListForProgrammeId : any;
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
    // this.getAllSubProjects();
    this.getAllProgrammes();
    //this.getAllSubProjectsByProgrammeId(26);
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

async getAllSubProjects() {
  this.httpProvider.getAllSubproject(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APISubProjectsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APISubProjectsList = [];
          }
      }}
    });
}

async getAllSubProjectsForProgrammeID(id:any) {
  this.ProgrammeID=id;
  this.httpProvider.getAllsubprojectforprogrammeID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APISubProjectsListForProgrammeId = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APISubProjectsListForProgrammeId = [];
          }
      }}
    });
}


getAlldataforProgrammeId(id:any)
{
this.getAllSubProjectsForProgrammeID(id) ;
this.getAllProjectsByProgrammeId(id) ;
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

  async updateRecord() {

    if (this.selectedSubProject.projectID == null){
      this.isValid=false; Notify.warning('Please select a Income Title.');
    } else{this.isValid=true;}

    if (this.selectedSubProject.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedSubProject.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedSubProject.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedSubProject.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedSubProject.id !== undefined) {
    this.httpProvider.updateSubproject(this.selectedSubProject)
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
      this.selectedSubProject.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedSubProject.status = 1;
  this.httpProvider.saveSubproject(this.selectedSubProject)
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
this.selectedSubProject = new SubProject();
this.selectedSubProject.programmeID=this.ProgrammeID;
this.getAllSubProjectsForProgrammeID(this.ProgrammeID) ;
//this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedSubProject = new SubProject();
  }

  async deleteSubProject(subProject: SubProject) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${subProject.code + "::" + subProject.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteSubprojectById(subProject.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('SubProject Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedSubProject = new SubProject();
this.selectedSubProject.programmeID=this.ProgrammeID;
this.getAllSubProjectsForProgrammeID(this.ProgrammeID) ;
      }, 1000);
  }
}

editSubProject(subProject: SubProject) {
  this.selectedSubProject = subProject;
}

}


