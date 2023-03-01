import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
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
import { Pagination } from '../../common/models/pagination.model';
import { PageEvent } from '@angular/material/paginator';

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

  displayedColumns: string[] = ['id', 'voteId', 'voteName', 'bankAccountId', 'office', 'actions'];
  dataSource = new MatTableDataSource<VoteAssignment>([]);
  paginator: MatPaginator;
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
     this.paginator = paginator;
     this.dataSource.paginator = this.paginator;
   }

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };
  @Output() paginated = new EventEmitter<PageEvent>();

  p: number = 1;
  
  APIVoteDetailsList :any;
  selectedVoteDetailsItems :any=[];
  VoteDetailsDropdownSettings:IDropdownSettings={};

  APIOfficesList : any;
  selectedOfficesItems :any=[];
  OfficesDropdownSettings:IDropdownSettings={};

  APIBankAccountsList : any;
  selectedBankAccountsItems :any=[];
  BankAccountsDropdownSettings:IDropdownSettings={};

  selectedVotesandBankAccountsListwithOffices :any=[];

  selectedVoteAssignment: VoteAssignment = new VoteAssignment();
  voteAssignments!: VoteAssignment[];


  loading = false;
  APIVoteAssignmentsList: any;
  SelectedVoteName :any;
  SelectedVoteId : any;
  isValid : boolean;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  isEditing:boolean = false;

  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder) {
  }
  isadmin:boolean=false;
  ngOnInit() {
    this.checkPermission("VOTEASSIGNMNT", Number(localStorage.getItem('Currentuserid')));
    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}
    
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllVoteDetails();
    this.getAllOffices();
    this.getAllAccountdetails();
    this.getAllVoteAssignmentsForSabhaId();

    this.VoteDetailsDropdownSettings = {
      idField: 'id',
      textField: 'code',
      singleSelection: false,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.selectedVoteDetailsItems = [
      // { id: 9, code: '450-01-11' }
    ];

    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {
      this.OfficesDropdownSettings = {
      idField: 'id',
      textField: 'nameSinhala',
      singleSelection: false,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.BankAccountsDropdownSettings = {
      idField: 'id',
      textField: 'nameSinhala',
      singleSelection: true,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    }

    if (this.SelectedLanguage=="Tamil")
    {
      this.OfficesDropdownSettings = {
      idField: 'id',
      textField: 'nameTamil',
      singleSelection: false,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.BankAccountsDropdownSettings = {
      idField: 'id',
      textField: 'nameTamil',
      singleSelection: true,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    }

    if (this.SelectedLanguage=="English")
    {
      this.OfficesDropdownSettings = {
      idField: 'id',
      textField: 'nameEnglish',
      singleSelection: false,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.BankAccountsDropdownSettings = {
      idField: 'id',
      textField: 'nameEnglish',
      singleSelection: true,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      allowSearchFilter: true
    };
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  haspermission :Boolean;

  async checkPermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.haspermission = Boolean(data.body);
          console.log('haspermission : '+this.haspermission);
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
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

async getAllVoteAssignmentsForSabhaId() {
  this.APIVoteAssignmentsList =[];
  this.httpProvider.getAllVoteAssignmentsForSabhaId(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteAssignmentsList = resultData;
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

async getAllOffices() {
  this.httpProvider.getAllOfficesForSabhaId(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIOfficesList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIOfficesList = [];
          }
      }}
    });
}

  async saveRecord() {
    if(this.isEditing==false){
     if (this.selectedVoteDetailsItems.length==0|| this.selectedOfficesItems.length==0 || this.selectedBankAccountsItems.length==0 ){
      this.isValid=false; Notify.warning('Please select at least one from each dropdown.');
    } else{this.isValid=true;}
  }
  else{this.isValid=true;}

    if (this.isValid==true) {
      if (this.isValid==true && this.isEditing==false) {
      this.selectedVotesandBankAccountsListwithOffices=[];
      this.selectedOfficesItems.forEach((office:any) => {
      this.selectedVoteDetailsItems.forEach((vote:any) => {
          this.selectedVotesandBankAccountsListwithOffices.push({
            id: 0,
            voteid: vote.id,
            officeId: office.id,
            bankAccountId: this.selectedBankAccountsItems[0].id,
            isActive: 1,
            dateCreated: null,
            dateModified:null,
            sabhaId:localStorage.getItem('sabhaId'),
            voteAssignmentDetail:null,
          });
        });
      });
  
    }
    if (this.isValid==true && this.isEditing==true) {
      this.selectedVotesandBankAccountsListwithOffices=[];
      this.selectedOfficesItems.forEach((office:any) => {
      this.selectedVoteDetailsItems.forEach((vote:any) => {
          this.selectedVotesandBankAccountsListwithOffices.push({
            id: this.selectedVoteAssignment.id,
            voteid: vote.id,
            officeId: office.id,
            bankAccountId: this.selectedBankAccountsItems[0].id,
            isActive: 1,
            dateCreated: null,
            dateModified:null,
            sabhaId:localStorage.getItem('sabhaId'),
            voteAssignmentDetail:null,
          });
        });
      });
    }
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
this.clearRecord() ;
this.getAllVoteAssignmentsForSabhaId();
}, 5000);
}
}

  clearRecord() {
    this.selectedBankAccountsItems=[];
    this.selectedOfficesItems=[];
    this.selectedVoteDetailsItems=[];

    this.selectedVoteAssignment = new VoteAssignment();
    this.SelectedVoteName="";
    this.isEditing=false;
  }

  async deleteVoteAssignment(voteAssignment: VoteAssignment) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the Vote Assignment ${voteAssignment.id}. This cannot be undone.`)) {
      this.httpProvider.deleteVoteAssignment(voteAssignment.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('VoteAssignment Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
       this.selectedVoteAssignment = new VoteAssignment();
       this.getAllVoteAssignmentsForSabhaId();
      }, 1000);
  }
  }

editVoteAssignment(voteAssignment: VoteAssignmentFullDataClass) {
  this.isEditing=true;
  this.selectedVoteAssignment = voteAssignment;
    this.selectedVoteDetailsItems = [
       { id: voteAssignment.voteId, code: voteAssignment.voteDetail.code }
    ];
    
    if (this.isSinhala) 
    this.selectedOfficesItems = [
      { id: voteAssignment.officeId, nameSinhala: voteAssignment.office.nameSinhala}
    ];
    this.selectedBankAccountsItems = [
      { id: voteAssignment.bankAccountId, nameSinhala: voteAssignment.accountDetail.nameSinhala}
      ];

    if (this.isTamil) 
    this.selectedOfficesItems = [
      { id: voteAssignment.officeId, nameTamil: voteAssignment.office.nameTamil }
    ];
    this.selectedBankAccountsItems = [
      { id: voteAssignment.bankAccountId, nameTamil: voteAssignment.accountDetail.nameTamil }
      ];

    if (this.isEnglish) 
    this.selectedOfficesItems = [
      { id: voteAssignment.officeId, nameEnglish: voteAssignment.office.nameEnglish }
    ];
    this.selectedBankAccountsItems = [
      { id: voteAssignment.bankAccountId, nameEnglish: voteAssignment.accountDetail.nameEnglish }
      ];
}



}
