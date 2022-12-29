  import { Component, OnInit } from '@angular/core';
  import {MatTableModule, MatTableDataSource} from '@angular/material/table';
  import { MatDividerModule } from '@angular/material/divider';
  import { VoteAllocation } from '../models/Voteallocation';
  import { HttpProviderService } from '../services/http-provider.service';
  import { Notify } from 'notiflix/build/notiflix-notify-aio';
  
  @Component({
    selector: 'app-voteallocation',
    templateUrl: './voteallocation.component.html',
    styleUrls: ['./voteallocation.component.scss']
  })
  export class VoteallocationComponent implements OnInit {
    selectedVoteallocation: VoteAllocation = new VoteAllocation();
    loading = false;
    balsheetTitleID : any;
    APIVoteallocationsList:any;
    APIVoteDetailsList :any;
    APIYearsList :any;
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
      this.getAllVoteallocations();
      this.getAllVoteDetails();
      this.getAllYears();
      this.loading = false;
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
  
  async getAllVoteallocations() {
    this.httpProvider.getAllVoteAllocation(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIVoteallocationsList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIVoteallocationsList = [];
            }
        }}
      });
  }
  
  
  // async getAllVoteallocationsByAccountdetailId(id : number) {
  //   this.httpProvider.getAllVoteAllocationByAccountdetailId(id).subscribe({
  //     next: (data) => {
  //     if (data != null && data.body != null) {
  //       var resultData = data.body;
  //       if (resultData) {
  //         this.APIVoteallocationsList = resultData;
  //       }
  //     }
  //   },
  //   error: error => {
  //         if (error.status == 404) {
  //           if(error.error && error.error.message){
  //             Notify.failure(error.error.message);
  //             this.APIVoteallocationsList = [];
  //           }
  //       }}
  //     });
  // }
  
    async updateRecord() {
  
      if (this.selectedVoteallocation.voteDetailID == null){
        this.isValid=false; Notify.warning('Please select a Accountdetail.');
      } else{this.isValid=true;}
  
      if (this.selectedVoteallocation.year == null){
        this.isValid=false; Notify.warning('Year is Required.');
      } else{this.isValid=true;}
  
      if (this.selectedVoteallocation.allocationAmount == null){
        this.isValid=false; Notify.warning('Allocation amount is Required.');
      } else{this.isValid=true;}
      
      if (this.selectedVoteallocation.incomeAmount == null){
        this.isValid=false; Notify.warning('Income amount is Required.');
      } else{this.isValid=true;}

      if (this.isValid==true) {
      if (this.selectedVoteallocation.id !== undefined) {
      this.httpProvider.updateVoteAllocation(this.selectedVoteallocation)
      .subscribe({
        next: (result) => {
             var resultData = result.body;
             console.log(result);
             Notify.success('Account balance detail Updated successfully..!');
        },
        error: error => {
           Notify.failure('Error Occured..!');
        }
    });
  }
  else {
        this.selectedVoteallocation.sabhaID = Number(localStorage.getItem('sabhaId'));
        this.selectedVoteallocation.status = 1;
        this.selectedVoteallocation.createdDate = new Date();
        
    this.httpProvider.saveVoteAllocation(this.selectedVoteallocation)
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
  this.selectedVoteallocation = new VoteAllocation();
  this.refresh();
  }, 1000);
  }
  }
  
    clearRecord() {
      this.selectedVoteallocation = new VoteAllocation();
    }
  
    async deleteVoteallocation(accountbalancedetail: VoteAllocation) {
      this.loading = true;
      if (confirm(`Are you sure you want to delete ${accountbalancedetail.allocationAmount}. This cannot be undone.`)) {
        this.httpProvider.deleteVoteAllocationById(accountbalancedetail.id)
        .subscribe({
          next: (data) => {
               var resultData = data.body;
               setTimeout(() => {this.refresh();}, 2000);
               Notify.success('Account balance detail Deleted successfully..!');
          },
          error: error => {
            Notify.failure('Error Occured..!');
          }
      });
      setTimeout(() => {
        this.selectedVoteallocation = new VoteAllocation();
        this.refresh();
        }, 1000);
    }
  }
  
  editVoteallocation(accountbalancedetail: VoteAllocation) {
    this.selectedVoteallocation = accountbalancedetail;
  }
  
  }
  