import { Component, OnInit, ViewChild } from '@angular/core';
import { VoteAssignment } from '../models/VoteAssignment';
import { VoteAssignmentFullDataClass } from '../models/VoteAssignment';
import { VoteDetail } from '../../vote-management/models/VoteDetail';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
@Component({
  selector: 'app-voteassignment',
  templateUrl: './voteassignment.component.html',
  styleUrls: ['./voteassignment.component.scss']
})

export class VoteAssignmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'voteId', 'subOfficeId', 'bankAccountId', 'actions'];
  dataSource = new MatTableDataSource<VoteAssignment>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  p: number = 1;
  // voteAssignmentForm:FormGroup;
  
  APIVoteDetailsList :any;
  selectedVoteDetailsItems :any=[];
  VoteDetailsDropdownSettings:IDropdownSettings={};

  APISubOfficesList : any;
  selectedSubOfficesItems :any=[];
  SubOfficesDropdownSettings:IDropdownSettings={};

  APIBankAccountsList : any;
  selectedBankAccountsItems :any=[];
  BankAccountsDropdownSettings:IDropdownSettings={};

  selectedVotesandBankAccountsList :any=[];
  selectedVotesandBankAccountsListwithOffices :any=[];

  selectedVoteAssignment: VoteAssignment = new VoteAssignment();
  voteAssignments!: VoteAssignment[];


  loading = false;
  APIVoteAssignmentsList: any;
  voteID :any;
  SelectedVoteName :any;
  objSelectedVoteDetail : any;
  VoteDetail :any;
  SelectedVoteId : any;
  isSubmitted: boolean = false;
  isValid : boolean;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  public voteSearchKeyword = 'code';
  public historyHeading: string = 'Recently selected';
  public placeholder: string = 'Enter the Vote Code';
   
  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.fetchPosts()
    console.log('DataSource', this.dataSource)

    this.getAllVoteDetails();
    this.getAllSubOffices();
    this.getAllAccountdetails();
    this.getAllVoteAssignmentsForSabhaId();

    this.VoteDetailsDropdownSettings = {
      idField: 'id',
      textField: 'code',
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.selectedVoteDetailsItems = [
      // { id: 9, code: '450-01-11' }
    ];

    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {
      this.SubOfficesDropdownSettings = {
      idField: 'id',
      textField: 'nameSinhala',
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.BankAccountsDropdownSettings = {
      idField: 'id',
      textField: 'nameSinhala',
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    }

    if (this.SelectedLanguage=="Tamil")
    {
      this.SubOfficesDropdownSettings = {
      idField: 'id',
      textField: 'nameTamil',
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.BankAccountsDropdownSettings = {
      idField: 'id',
      textField: 'nameTamil',
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    }

    if (this.SelectedLanguage=="English")
    {
      this.SubOfficesDropdownSettings = {
      idField: 'id',
      textField: 'nameEnglish',
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.BankAccountsDropdownSettings = {
      idField: 'id',
      textField: 'nameEnglish',
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    }

  //   this.voteAssignmentForm = this.fb.group({
  //     votesDropdown: [this.selectedVoteDetailsItems],
  //     subOfficesDropdown: [this.selectedSubOfficesItems],
  //     bankAccountsDropdown: [this.selectedBankAccountsItems]
  // });

  }

  // fetchPosts(): void {
  //   this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
  //     this.dataSource.data = data as Post[];
  //   })
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // GenerateVoteAssignmentListToSave() {
  //   const a: any[] = [];
  //   for (let i = 0; i < 5; i++) {
  //     a.push(names.reduce((acc, val) => {
  //       acc[val] = val + i
  //       return acc
  //     }, {}));
  //   }
  //   return a;
  // }



onVoteSelect(item: any) {
    console.log('onItemSelect', item);
}
onVoteDeSelect(item: any) {
    console.log('onItemDeSelect', item);
}
onVoteSelectAll(items: any) {
    console.log('onSelectAll', items);
}
onVoteUnSelectAll() {
    console.log('onUnSelectAll fires');
}

onSubOfficeSelect(item: any) {
  console.log('onItemSelect', item);
}
onSubOfficeDeSelect(item: any) {
  console.log('onItemDeSelect', item);
}
onSubOfficeSelectAll(items: any) {
  console.log('onSelectAll', items);
}
onSubOfficeUnSelectAll() {
  console.log('onUnSelectAll fires');
}

onBankAccountSelect(item: any) {
  console.log('onItemSelect', item);
}
onBankAccountDeSelect(item: any) {
  console.log('onItemDeSelect', item);
}
onBankAccountSelectAll(items: any) {
  console.log('onSelectAll', items);
}
onBankAccountUnSelectAll() {
  console.log('onUnSelectAll fires');
}

  async refresh() {
    this.loading = true;
    this.isValid = false;
    this.getAllVoteDetails();
    this.getAllSubOffices();
    this.getAllAccountdetails();
    this.getAllVoteAssignmentsForSabhaId();
    this.loading = false;
  }

  async onChangeVote(selectedVote:any) {
    if (this.isSinhala) 
    this.SelectedVoteName=selectedVote.nameSinhala;
    if (this.isTamil) 
    this.SelectedVoteName=selectedVote.nameTamil;
    if (this.isEnglish) 
    this.SelectedVoteName=selectedVote.nameEnglish;
    this.SelectedVoteId = selectedVote.id;

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

async getAllVoteAssignmentsForSabhaId() {
  this.httpProvider.getAllVoteAssignmentsForSabhaId(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteAssignmentsList = resultData;
        console.log(this.APIVoteAssignmentsList);
        this.dataSource.data=resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteAssignmentsList =[];
          }
      }}
    });
}

async getAllAccountdetails() {
  this.httpProvider.getAllAccountDetail(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBankAccountsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBankAccountsList = [];
          }
      }}
    });
}

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e:void) {
  // do something
}

async getAllSubOffices() {
  this.httpProvider.getAllSubOfficesForSabhaId(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APISubOfficesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APISubOfficesList = [];
          }
      }}
    });
}

  async saveRecord() {

     if (this.selectedVoteDetailsItems.length==0|| this.selectedSubOfficesItems.length==0 || this.selectedBankAccountsItems.length==0 ){
      this.isValid=false; Notify.warning('Please select at least one from each dropdown.');
    } else{this.isValid=true;}
    if (this.isValid==true) {

      this.selectedVotesandBankAccountsListwithOffices=[];
      this.selectedSubOfficesItems.forEach((office:any) => {
      this.selectedVoteDetailsItems.forEach((vote:any) => {
          this.selectedVotesandBankAccountsListwithOffices.push({
            id: 0,
            voteid: vote.id,
            subOfficeId: office.id,
            bankAccountId: this.selectedBankAccountsItems[0].id,
            isActive: 1,
            dateCreated: null,
            dateModified:null,
            sabhaId:localStorage.getItem('sabhaId'),
            voteAssignmentDetail:null,
          });
        });
      });
      console.log(this.selectedVotesandBankAccountsListwithOffices);
      this.selectedVoteAssignment=this.selectedVotesandBankAccountsListwithOffices;
  this.httpProvider.saveVoteAssignment(this.selectedVoteAssignment)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Vote Assigned successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
setTimeout(() => {
this.selectedVoteAssignment = new VoteAssignment();
this.SelectedVoteName="";
this.selectedVoteAssignment.voteId=this.voteID;
this.getAllVoteAssignmentsForSabhaId();
}, 5000);
}
}

  clearRecord() {
    this.selectedBankAccountsItems=[];
    this.selectedSubOfficesItems=[];
    this.selectedVoteDetailsItems=[];

    this.selectedVoteAssignment = new VoteAssignment();
    this.SelectedVoteName="";
  }


//   deleteProduct(item: posItem) {
//     this.confirmationService.confirm({
//         message: 'You are not allowed to delete ' + item.Description + '?',
//         header: 'Not Allowed',
//         icon: 'pi pi-exclamation-triangle',
        
//     });
// }

  async deleteVoteAssignment(voteAssignment: VoteAssignment) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the Vote Assignment ${voteAssignment.id}. This cannot be undone.`)) {
      this.httpProvider.deleteVoteAssignment(voteAssignment.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             //setTimeout(() => {this.refresh();}, 2000);
             Notify.success('VoteAssignment Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
       this.selectedVoteAssignment = new VoteAssignment();
       this.selectedVoteAssignment.voteId=this.voteID;
       this.getAllVoteAssignmentsForSabhaId();
      }, 1000);
  }
  }

editVoteAssignment(voteAssignment: VoteAssignment) {
  this.selectedVoteAssignment = voteAssignment;
  this.objSelectedVoteDetail = this.APIVoteDetailsList.find((obj:any) => obj.id == voteAssignment.voteId);
    if (this.isSinhala) 
    this.SelectedVoteName=this.objSelectedVoteDetail.nameSinhala;
    if (this.isTamil) 
    this.SelectedVoteName=this.objSelectedVoteDetail.nameTamil;
    if (this.isEnglish) 
    this.SelectedVoteName=this.objSelectedVoteDetail.nameEnglish;
}

}
