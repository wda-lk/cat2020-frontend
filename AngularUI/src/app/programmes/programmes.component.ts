import { Component, OnInit } from '@angular/core';
import { Programme } from '../models/programme';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss']
})
export class ProgrammesComponent implements OnInit {
  selectedProgramme: Programme = new Programme();
  loading = false;
  APIProgrammesList:any;
  isSubmitted: boolean = false;
  isValid : boolean =false;
  SelectedLanguage : any;
  isSinhala :boolean = false;
  isTamil :boolean= false;
  isEnglish :boolean= false;

  constructor(private httpProvider: HttpProviderService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.refresh();
    this.spinner.hide();
  }

  async refresh() {
    this.isSinhala=false;
    this.isTamil=false;
    this.isEnglish=false;
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

// async updateProgramme(isValid: any) {
  async updateProgramme() {
    // this.isSubmitted = true;
    if (this.selectedProgramme.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{this.isValid=true;}

    if (this.selectedProgramme.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{this.isValid=true;}

    if (this.selectedProgramme.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{this.isValid=true;}
    
    if (this.selectedProgramme.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;}

    if (this.isValid==true) {
    if (this.selectedProgramme.id !== undefined) {
    this.httpProvider.updateProgramme(this.selectedProgramme)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           console.log(result);
           Notify.success('Programme Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
    // }
else {
  // this.isSubmitted = true;
    // if (isValid) {
      this.selectedProgramme.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedProgramme.status = 1;
  this.httpProvider.saveProgramme(this.selectedProgramme)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         console.log(result);
         Notify.success('Programme Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
this.selectedProgramme = new Programme();
this.refresh();
}, 2000);
  // await this.refresh();
// }
}
  }

  editProgramme(programme: Programme) {
    this.selectedProgramme = programme;
  }

  clearProgramme() {
    this.selectedProgramme = new Programme();
  }

  async deleteProgramme(programme: Programme) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${programme.code + "::" + programme.nameEnglish}. This cannot be undone.`)) {
      this.httpProvider.deleteProgrammeById(programme.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('Programme Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {this.refresh();}, 2000);
  }
}
}
