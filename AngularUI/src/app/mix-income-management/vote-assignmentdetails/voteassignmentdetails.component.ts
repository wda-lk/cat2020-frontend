import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { VoteAssignment } from '../models/VoteAssignment';
import { VoteAssignmentFullDataClass } from '../models/VoteAssignment';
import { VoteDetail } from '../../vote-management/models/VoteDetail';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-voteassignmentdetails',
  templateUrl: './voteassignmentdetails.component.html',
  styleUrls: ['./voteassignmentdetails.component.scss']
})

export class VoteAssignmentDetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'voteId', 'customVoteName', 'actions'];
  dataSource = new MatTableDataSource<VoteAssignment>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };
  @Output() paginated = new EventEmitter<PageEvent>();
  p: number = 1;
  
  APIVoteDetailsList :any;

  voteAssignmentID:any;
  selectedofficeId:any;

  selectedVoteDetailsItems :any=[];
  formdata :any=[];
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

  selectedVoteAssignmentDetail:any=[];


  loading = false;
  APIVoteAssignmentsForOfficeList: any=[];
  APICustomVoteNamesForOfficeList: any=[];
  SelectedVoteName :any;
  SelectedVoteId : any;
  isValid : boolean;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  isEditing:boolean = false;

  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder) {
    this.customVoteNameForm = this.fb.group({  
      offices: '',  
      assignedVotes: '',  
      customVoteNames: this.fb.array([]) ,  
    });  
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

    this.getAllOffices();
    //this.getAllAccountdetails();
    //this.getAllVoteAssignmentsForOfficeId();

    this.VoteDetailsDropdownSettings = {
      idField: 'id',
      textField: 'voteCode',
      singleSelection: true,
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
      singleSelection: true,
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
      singleSelection: true,
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
      singleSelection: true,
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

  customVoteNameForm: FormGroup;  
     
  customVoteNames() : FormArray {  
    return this.customVoteNameForm.get("customVoteNames") as FormArray  
  }  
     
  newCustomVoteName(): FormGroup {  
    return this.fb.group({  
      customvotename: ''
    })  
  }  
     
  addCustomVoteName() {  
    this.customVoteNames().push(this.newCustomVoteName());  
  }  
     
  removeCustomVoteName(i:number) {  
    this.customVoteNames().removeAt(i);  
  }  
     
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllDataForOfficeID(id:any)
  {
    if(id!="undefined" && id!=null)
    {
    localStorage.setItem('officeId', id);
    this.selectedofficeId=localStorage.getItem('officeId');
    this.getAllVoteAssignmentsForOfficeId(id);
  }
  else{
    this.APIVoteAssignmentsForOfficeList=[];
  }

  }

async getAllVoteAssignmentsForOfficeId(id:any) {
  this.dataSource = new MatTableDataSource<VoteAssignment>([]);
  this.APICustomVoteNamesForOfficeList =[];
  this.httpProvider.getAllVoteAssignmentsForOfficeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteAssignmentsForOfficeList = resultData;
        this.APIVoteAssignmentsForOfficeList.forEach((voteAssignment:any) => {
          if(voteAssignment.voteAssignmentDetails.length>0)
          {
            voteAssignment.voteAssignmentDetails.forEach((voteAssignmentDetail:any) => {
            this.APICustomVoteNamesForOfficeList.push({
              id: voteAssignmentDetail.id,
              customVoteName: voteAssignmentDetail.customVoteName,
              voteAssignmentId:voteAssignmentDetail.voteAssignmentId,
              voteCode: voteAssignment.voteCode,
              isActive: voteAssignmentDetail.isActive,
              dateCreated: null,
              dateModified:null
            });
          });
          }
        });
        this.dataSource.data=this.APICustomVoteNamesForOfficeList;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteAssignmentsForOfficeList =[];
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
    this.formdata=this.customVoteNameForm.value;
    if(this.isEditing==false){
     if (this.formdata.assignedVotes==null || this.formdata.assignedVotes==""){
      this.isValid=false; Notify.warning('Please select a vote');
     }
     else if(this.formdata.customVoteNames.length==0 || this.formdata.customVoteNames[0].customvotename=="") {
        this.isValid=false; Notify.warning('Please Enter a Custom Vote Name');
    }
    else{
      this.isValid=true;
    }
  }
  else{this.isValid=true;}
    if (this.isValid==true) {
      if (this.isValid==true && this.isEditing==false) {
      this.formdata.customVoteNames.forEach((voteAssignDetail:any) => {
        if(voteAssignDetail.customvotename!="")
        {
          this.selectedVoteDetailsItems.push({
            id: 0,
            voteAssignmentId: this.formdata.assignedVotes,
            customVoteName: voteAssignDetail.customvotename,
            isActive: 1,
            dateCreated: null,
            dateModified:null
          });
        }
        });
    }
    // if (this.isValid==true && this.isEditing==true) {
    //   this.selectedVoteDetailsItems.forEach((vote:any) => {
    //       this.selectedVotesandBankAccountsListwithOffices.push({
    //         id: this.selectedVoteAssignmentDetail.id,
    //         voteAssignmentId: this.selectedVoteAssignmentDetail.voteAssignmentId,
    //         isActive: 1,
    //         dateCreated: null,
    //         dateModified:null,
    //       });
    //     });
    // }
  this.httpProvider.saveVoteAssignmentDetail(this.selectedVoteDetailsItems)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Vote Assignment Details added successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
setTimeout(() => {
this.clearRecord() ;
this.getAllVoteAssignmentsForOfficeId(this.selectedofficeId);
}, 5000);
}
}

  clearRecord() {
    this.customVoteNameForm.reset();  
    this.customVoteNameForm.controls['offices'].setValue(this.selectedofficeId);
    this.selectedVoteDetailsItems=[];
    this.voteAssignmentID=0;

    // this.selectedBankAccountsItems=[];
    // this.selectedOfficesItems=[];

    // this.selectedVoteAssignment = new VoteAssignment();
    // this.SelectedVoteName="";
    // this.isEditing=false;
  }

  async deleteCustomVoteName(voteAssignment: VoteAssignment) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the Vote Assignment Detail ${voteAssignment.id}. This cannot be undone.`)) {
      this.httpProvider.deleteVoteAssignmentDetail(voteAssignment.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('VoteAssignment Detail Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      //this.clearRecord() ;
      this.getAllVoteAssignmentsForOfficeId(this.selectedofficeId);
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
