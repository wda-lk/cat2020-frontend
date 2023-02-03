import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { Project } from '../models/Project';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-voteincomeproject',
  templateUrl: './voteincomeproject.component.html',
  styleUrls: ['./voteincomeproject.component.scss']
})
export class VoteincomeprojectComponent implements OnInit {
  selectedProject: Project = new Project();
  loading = false;
  APIProjectsList:any;
  APIProjectsFroProgrammeList:any;
  APIProgrammesList :any;
  isSubmitted: boolean = false;
  isValid : boolean;
  ProgrammeID : any;

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

async getAllProjects() {
  this.httpProvider.getAllProject(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIProjectsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIProjectsList = [];
          }
      }}
    });
}


async getAllProjectsByProgrammeId(id : number) {
  this.ProgrammeID = id;
  this.httpProvider.getAllProjectsForProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIProjectsFroProgrammeList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIProjectsFroProgrammeList = [];
          }
      }}
    });
}

  async updateRecord() {

    if (this.selectedProject.programmeID == null){
      this.isValid=false; Notify.warning('Please select a Programme.');
    } else{this.isValid=true;}

    if (this.selectedProject.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedProject.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedProject.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}

    if (this.selectedProject.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedProject.id !== undefined) {
    this.httpProvider.updateProject(this.selectedProject)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('Project Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      this.selectedProject.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedProject.status = 1;
  this.httpProvider.saveProject(this.selectedProject)
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
this.selectedProject = new Project();
this.selectedProject.programmeID=this.ProgrammeID;
this.getAllProjectsByProgrammeId(this.ProgrammeID) ;
}, 1000);
}
}

  clearRecord() {
    this.selectedProject = new Project();
  }

  async deleteProject(project: Project) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${project.code + "::" + project.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteProjectById(project.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('Project Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedProject = new Project();
      this.selectedProject.programmeID=this.ProgrammeID;
      this.getAllProjectsByProgrammeId(this.ProgrammeID) ;
      }, 1000);
  }
}

editProject(project: Project) {
  this.selectedProject = project;
}

}
