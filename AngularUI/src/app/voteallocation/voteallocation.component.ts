  import { Component, OnInit } from '@angular/core';
  import { VoteAllocation } from '../models/VoteAllocation';
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
    APIVoteallocationsListbyVoteDetailIdandSabhaId :any;
    APIYearsList :any;
    isSubmitted: boolean = false;
    isValid : boolean;
    SelectedLanguage : any;
    objSelectedVoteDetail : any;
    objSelectedVoteAllocation : any;
    selectedYear :any =0;
    isSinhala :boolean;
    isTamil :boolean;
    isEnglish :boolean;
    APIVoteDetailsForProgrammeList:any;
    APIProgrammesList :any;
    programmeID :any;

    // votedetaillist: any[];
    // selected: string = "";

  //   myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

    // votecode:any;
    // filteredOptions: Observable<string[]>;

    constructor(private httpProvider: HttpProviderService) {
    }
  
    ngOnInit() {
      this.refresh();
      this.getAllProgrammes();
      // this.getAllVoteDetails();

      // this.filteredOptions = this.myControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value || '')),
      // );

    //   this.votedetaillist = [
    //     { "id": "1", "nameSinhala": "Afghanistan", "code": "AF" },
    //     { "id": "2", "nameSinhala": "Åland Islands", "code": "AX" },
    //     { "id": "3", "nameSinhala": "Albania", "code": "AL" },
    //     { "id": "4", "nameSinhala": "Algeria", "code": "DZ" },
    //     { "id": "5", "nameSinhala": "American Samoa", "code": "AS" }
    // ]
      // this.filteredOptions = this.votecode.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value || '')),
      // );
    }
  //   selectCountryName(name) {
  //     console.log(name);
  //     console.log(this.selected);
  // }

  //  private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

    // private _filter(value: string): string[] {
    //   const filterValue = value.toLowerCase();
  
    //   return this.APIVoteDetailsList.filter(option => option.toLowerCase().includes(filterValue));
    // }
  
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
     // this.getAllVoteallocations();
      // this.getAllVoteDetails();
      this.getAllYears();
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

    onchangeProgramme(id: any)
    {
      this.getAllVoteDetailsForProgrammeId(id);
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

  async getAllVoteAllocationbyVoteDetailIdandSabhaId(id:any) {
    this.httpProvider.getAllVoteAllocationbyVoteDetailIdandSabhaId(id,localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIVoteallocationsListbyVoteDetailIdandSabhaId = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIVoteallocationsListbyVoteDetailIdandSabhaId = [];
            }
        }}
      });
  }

  
  async GetAllVoteAllocationsForVoteDetailIdandSabhaIdandYear() {
    this.httpProvider.getAllVoteAllocationsForVoteDetailIdandSabhaIdandYear(this.objSelectedVoteDetail.id,localStorage.getItem('sabhaId'),this.selectedYear).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIVoteallocationsListbyVoteDetailIdandSabhaId = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIVoteallocationsListbyVoteDetailIdandSabhaId = [];
            }
        }}
      });
  }

  onchangeVoteDetail(id : any)
{
  this.objSelectedVoteDetail=null;
  this.objSelectedVoteDetail = this.APIVoteDetailsForProgrammeList.find((obj:any) => obj.id == id);
  this.GetAllVoteAllocationsForVoteDetailIdandSabhaIdandYear();
}

onchangeYear(year : any)
{
  this.selectedYear = year;
  this.GetAllVoteAllocationsForVoteDetailIdandSabhaIdandYear();
}

    async updateRecord() {
  
      if (this.selectedVoteallocation.voteDetailID == null){
        this.isValid=false; Notify.warning('Please select a Vote Detail.');
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
             Notify.success('Vote Allocations Updated successfully..!');
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
           Notify.success('Income Title Created successfully..!');
      },
      error: error => {
        Notify.failure('Error Occured..!');
      }
  });
  }
  setTimeout(() => {
  this.objSelectedVoteAllocation=this.selectedVoteallocation;
  this.selectedVoteallocation = new VoteAllocation();
  this.selectedVoteallocation.voteDetailID=this.objSelectedVoteDetail.id;
  this.selectedVoteallocation.year=this.objSelectedVoteAllocation.year;
  this.GetAllVoteAllocationsForVoteDetailIdandSabhaIdandYear();
  }, 1000);
  }
  }
  
    clearRecord() {
      this.selectedVoteallocation = new VoteAllocation();
    }
  
    async deleteVoteAllocation(voteAllocation: VoteAllocation) {
      this.loading = true;
      if (confirm(`Are you sure you want to delete vote allocation for ${this.objSelectedVoteDetail.code}. This cannot be undone.`)) {
        this.httpProvider.deleteVoteAllocationById(voteAllocation.id)
        .subscribe({
          next: (data) => {
               var resultData = data.body;
               Notify.success('Vote Allocation Deleted successfully..!');
          },
          error: error => {
            Notify.failure('Error Occured..!');
          }
      });
      setTimeout(() => {
        this.objSelectedVoteAllocation=this.selectedVoteallocation;
        this.selectedVoteallocation = new VoteAllocation();
        this.selectedVoteallocation.voteDetailID=this.objSelectedVoteDetail.id;
        this.selectedVoteallocation.year=this.objSelectedVoteDetail.year;
        this.GetAllVoteAllocationsForVoteDetailIdandSabhaIdandYear() ;
        
        }, 1000);
    }
  }
  
  editVoteAllocation(voteAllocation: VoteAllocation) {
    this.selectedVoteallocation = voteAllocation;
  }
  
  }
  