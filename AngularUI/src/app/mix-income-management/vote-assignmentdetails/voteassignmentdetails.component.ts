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
  paginator: MatPaginator;
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
     this.paginator = paginator;
     this.dataSource.paginator = this.paginator;
   }

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };
  @Output() paginated = new EventEmitter<PageEvent>();
  p: number = 1;
  
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

  public voteSearchKeyword = 'voteCode';
  public historyHeading: string = 'Recently selected';
  public placeholder: string = 'Enter the Vote Code';


  loading = false;
  APIVoteAssignmentsForOfficeList: any=[];
  APICustomVoteNamesForOfficeList: any=[];
  SelectedVoteName :any;
  SelectedVoteId : any;
  isValid : boolean;
  objIncomeTitle : any;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  isEditing:boolean = false;
  submitButtonClickCount :number = 1;
  
  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder) {
    this.customVoteNameForm = this.fb.group({  
      offices: '',  
      assignedVotes: '',  
      customVoteNames: this.fb.array([]) ,  
    });  
  }
  isadmin:boolean=false;
  ngOnInit() {
    this.checkPermission("CUSTOMVOTEASIGNADDEDIT", Number(localStorage.getItem('Currentuserid')));
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

    this.getAllOffices();
    //this.getAllAccountdetails();
    //this.getAllVoteAssignmentsForOfficeId();
    this.getAllDataForOfficeID(localStorage.getItem('CurrentOfficeId'))
    this.customVoteNameForm.controls['offices'].setValue(localStorage.getItem('CurrentOfficeId'));

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
    // console.log(this.APIVoteAssignmentsForOfficeList);
  }
  else{
    this.APIVoteAssignmentsForOfficeList=[];
  }

  }

onVoteSelect(item: any) {
    // console.log('onItemSelect', item);
    this.objIncomeTitle = this.APIVoteAssignmentsForOfficeList.find((obj:any) => obj.id == item.id);
   this.SelectedVoteId=this.objIncomeTitle.id;
   if (this.isSinhala) 
   this.SelectedVoteName=this.objIncomeTitle.voteNameSinahala;
    if (this.isTamil) 
    this.SelectedVoteName=this.objIncomeTitle.voteNameTamil;
    if (this.isEnglish) 
    this.SelectedVoteName=this.objIncomeTitle.voteNameEnglish;;
}
onVoteDeSelect(item: any) {
    // console.log('onItemDeSelect', item);
    this.SelectedVoteName="";
    this.SelectedVoteId=0;
}
onVoteSelectAll(items: any) {
    // console.log('onSelectAll', items);
}
onVoteUnSelectAll() {
    // console.log('onUnSelectAll fires');
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

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:void) {
    // do something
  }

async getAllVoteAssignmentsForOfficeId(id:any) {
  this.dataSource = new MatTableDataSource<VoteAssignment>([]);
  this.APIVoteAssignmentsForOfficeList=[];
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
    if (this.formdata.assignedVotes==null || this.formdata.assignedVotes==""){
      Notify.warning('Please select a vote');
     }
     
  //  if(this.formdata.customVoteNames.length==0 || this.formdata.customVoteNames[0].customvotename=="") {
  //         this.isValid=false; Notify.warning('Please Enter a Custom Vote Name');
  //  }
    else{
      this.isValid=true;
    }
    if (this.isValid==true) {
      if (this.formdata.customVoteNames.length>0){ 
      this.formdata.customVoteNames.forEach((voteAssignDetail:any) => {
        if(voteAssignDetail.customvotename!="")
        {
          this.selectedVoteDetailsItems.push({
            id: 0,
            voteAssignmentId: this.formdata.assignedVotes[0].id,
            customVoteName: voteAssignDetail.customvotename,
            isActive: 1,
            dateCreated: null,
            dateModified:null
          });
        }
        });
      }
      else{
        if(this.SelectedVoteId!=0 && this.SelectedVoteName!="")
        {
          this.selectedVoteDetailsItems.push({
            id: 0,
            voteAssignmentId: this.SelectedVoteId,
            customVoteName: this.SelectedVoteName,
            isActive: 1,
            dateCreated: null,
            dateModified:null
          });
        }
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
// console.log(this.selectedVoteDetailsItems);

if(this.submitButtonClickCount==1)
    {
    this.submitButtonClickCount=this.submitButtonClickCount+1;
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
    }
    else{
      Notify.success('Please Wait, Allready Sent the Save Request..!');
    }
setTimeout(() => {
this.clearRecord() ;
// this.getAllVoteAssignmentsForOfficeId(this.selectedofficeId);
}, 5000);
}
}

  clearRecord() {
    this.customVoteNameForm.reset();  
    // this.customVoteNameForm.controls['offices'].setValue(this.selectedofficeId);
    this.customVoteNameForm.controls['offices'].setValue(localStorage.getItem('CurrentOfficeId'));
    this.selectedVoteDetailsItems=[];
    this.SelectedVoteName="";
    this.SelectedVoteId=0;
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
