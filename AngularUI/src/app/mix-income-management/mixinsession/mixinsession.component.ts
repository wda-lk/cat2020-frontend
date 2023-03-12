import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { VoteAssignment } from '../models/VoteAssignment';
import { VoteAssignmentFullDataClass } from '../models/VoteAssignment';
import { MixinOrder } from '../models/MixinOrder';
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
import { Router } from '@angular/router';
import { NgxBarcode6Component } from 'ngx-barcode6';
import { interval, Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { Session } from '../../common/models/Session';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
@Component({
  selector: 'app-mixinsession',
  templateUrl: './mixinsession.component.html',
  styleUrls: ['./mixinsession.component.scss']
})

export class MixinSessionComponent implements OnInit {
  haspermission :Boolean=true;
  displayedColumns: string[] = ['position','module', 'name', 'startAt','stopAt', 'active', 'actions'];
  dataSource = new MatTableDataSource<Session>([]);
  paginator: MatPaginator;
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
     this.paginator = paginator;
     this.dataSource.paginator = this.paginator;
   }
   @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  @Output() paginated = new EventEmitter<PageEvent>();
  p: number = 1;
  
  currentSession : Session = new Session();

  selectedofficeId:any;
  selectedOrderStatus :any=1;
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

  headerTitle :any ="Purchase Orders";
  headerDescription :any ="Use to create Purchase Orders of Kohoku Lanka Read more";

  loading = false;
  sessionsList: Session[];
  APIMixinOrders:[];
  selectedOrderforBarcode: any;
  SelectedVoteName :any;
  SelectedVoteId : any;
  isValid : boolean;
  objIncomeTitle : any;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  hassession:boolean;

  isEditing:boolean = false;

  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder,private _router: Router,private spinner: NgxSpinnerService) {
    
    this.customVoteNameForm = this.fb.group({  
      offices: '',  
      assignedVotes: '',  
      customVoteNames: this.fb.array([]) ,  
    });  
  }

  isadmin:boolean=false;

  bcValue:any=0;

  elementType = 'svg';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  get values(): string[] {
    return this.value.split('\n');
  }
  codeList: string[] = [
    '', 'CODE128',
    'CODE128A', 'CODE128B', 'CODE128C',
    'UPC', 'EAN8', 'EAN5', 'EAN2',
    'CODE39',
    'ITF14',
    'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
    'pharmacode',
    'codabar'
  ];

  
subscription: Subscription;
source = interval(60000);


  ngOnInit() {
    this.checkPermission("MIXINSESSION", Number(localStorage.getItem('Currentuserid')));
    
    this.spinner.show();
    this.getCurrentSession();
    this.getSessionByOfficeAndModule(Number(localStorage.getItem('CurrentOfficeId')), "MIX");

    // if(Number(localStorage.getItem('IsAdmin'))==1)
    // {this.isadmin=true;}
    
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.getAllOffices();
    //this.getAllAccountdetails();
     this.getAllSessionsByOfficeAndModule;

    // this.subscription = this.source.subscribe(val =>  this.getAllMixinOrdersForOfficeAndState(this.selectedOrderStatus));


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
    this.spinner.hide();
  }

  advancedSettings()  { 
    // if(this.currentSession.id!=0)
    // {
    // this._router.navigateByUrl('/mixinorderaddedit');
    // }
    // else{
    //   Notify.failure('Please Start a Session First..!');
    // }
  }

  startSession()  {  
    if (confirm(`Are you sure you want to Start a Session ?`)) {
      this.startSessionAPI();
      this.getCurrentSession();
    }
  }  


  endSession()  {  
    if (confirm(`Are you sure you want to End the Session ?`)) {
      this.endSessionAPI();
      this.getAllSessionsByOfficeAndModule();
    }
  }  

  getCurrentSession()  {  
    this.getSessionByOfficeAndModule(Number(localStorage.getItem('CurrentOfficeId')), "MIX");
    this.getAllSessionsByOfficeAndModule();
  }


  async getSessionByOfficeAndModule(officeid:number,module:any) {
    this.httpProvider.getSessionByOfficeAndModule(officeid,module).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.currentSession = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.currentSession=new Session();
            }
        }}
      });
  }

  async startSessionAPI() {
    if (this.currentSession.id == 0) {
      this.currentSession.name="MIX-"+new Date().toDateString;
      this.currentSession.module="MIX";
      this.currentSession.active=1;
      this.currentSession.createdAt=new Date();
      this.currentSession.startAt=new Date();
      this.currentSession.createdBy=Number(localStorage.getItem('Currentuserid'));
      this.currentSession.officeId=Number(localStorage.getItem('CurrentOfficeId'))

     this.httpProvider.startSession(this.currentSession)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           this.currentSession = new Session();
           this.currentSession=result.body;
           Notify.success('Session Started Successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
  setTimeout(() => {
  // this.currentSession = new Session();
  }, 2000);
  }
  else{
    Notify.failure('Error Occured..!');
  }
  }

  async endSessionAPI() {
    if (this.currentSession.id != 0) {
      this.currentSession.active=0;
      this.currentSession.updatedBy=Number(localStorage.getItem('Currentuserid'));
      this.currentSession.stopAt=new Date();

     this.httpProvider.endSession(this.currentSession)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           this.currentSession = new Session();
           this.currentSession=result.body;
          //  console.log(result.body);
           this.currentSession.id=0;
           Notify.success('Session Ended Successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
  setTimeout(() => {
  // this.currentSession = new Session();
  }, 2000);
  }
  else{
    Notify.failure('No any Started Sessions found..!');
  }
  }

  

  async checkPermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.haspermission = Boolean(data.body);
          // console.log('haspermission : '+this.haspermission);
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

onVoteSelect(item: any) {
  //   this.objIncomeTitle = this.getAllMixinOrder.find((obj:any) => obj.id == item.id);
  //  this.SelectedVoteId=this.objIncomeTitle.id;
  //  if (this.isSinhala) 
  //  this.SelectedVoteName=this.objIncomeTitle.voteNameSinahala;
  //   if (this.isTamil) 
  //   this.SelectedVoteName=this.objIncomeTitle.voteNameTamil;
  //   if (this.isEnglish) 
  //   this.SelectedVoteName=this.objIncomeTitle.voteNameEnglish;;
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

async getAllSessionsByOfficeAndModule() {
  // console.log(orderstate);
  this.dataSource = new MatTableDataSource<Session>([]);
  this.sessionsList=[];
  this.httpProvider.getAllSessionsByOfficeAndModule(localStorage.getItem('CurrentOfficeId'),"MIX").subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      // console.log(resultData);
      this.sessionsList = resultData;
        this.dataSource.data=this.sessionsList;
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIMixinOrders =[];
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
    //  if (this.formdata.assignedVotes==null || this.formdata.assignedVotes==""){
    //   this.isValid=false; Notify.warning('Please select a vote');
    //  }
     if (this.SelectedVoteId==null || this.SelectedVoteId==0){
      this.isValid=false; Notify.warning('Please select a vote');
     }
    //  else if(this.formdata.customVoteNames.length==0 || this.formdata.customVoteNames[0].customvotename=="") {
    //      this.isValid=false; Notify.warning('Please Enter a Custom Vote Name');
    // }
    else{
      this.isValid=true;
    }
  }
  else{this.isValid=true;}
    if (this.isValid==true) {
      if (this.isValid==true && this.isEditing==false) {

      if (this.formdata.assignedVotes==null || this.formdata.assignedVotes==""){ 
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
    this.spinner.show();
  this.httpProvider.saveMixinOrderDetail(this.selectedVoteDetailsItems)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Mixin Order Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
setTimeout(() => {
this.clearRecord() ;
this.spinner.hide();
// this.getAllVoteAssignmentsForOfficeId(this.selectedofficeId);
}, 5000);
}
}

  clearRecord() {
    this.customVoteNameForm.reset();  
    this.customVoteNameForm.controls['offices'].setValue(this.selectedofficeId);
    this.selectedVoteDetailsItems=[];
    this.SelectedVoteName="";
    this.SelectedVoteId=0;
    // this.selectedBankAccountsItems=[];
    // this.selectedOfficesItems=[];

    // this.selectedVoteAssignment = new VoteAssignment();
    // this.SelectedVoteName="";
    // this.isEditing=false;
  }

  // async cancelMixinOrder(mixinOrder: any) {
  //   this.loading = true;
  //   if (confirm(`Are you sure you want to cancel the Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
  //     this.httpProvider.cancelMixinOrder(mixinOrder.id)
  //     .subscribe({
  //       next: (data) => {
  //            var resultData = data.body;
  //            Notify.success('Mixin Order Sent for Cancel Approval.');
  //       },
  //       error: error => {
  //         Notify.failure('Error Occured..!');
  //       }
  //   });
  //   setTimeout(() => {
  //     //this.clearRecord() ;
  //     this.getAllMixinOrdersForOfficeAndState(this.selectedOrderStatus);
  //     }, 1000);
  // }
  // }

  async printMixinOrder(mixinOrder: any) {
  }

  async viewMixinOrder(mixinOrder: any) {
    this._router.navigateByUrl('/mixinorderview',mixinOrder.id);
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

barcode :any;
hasorderforbarcode :boolean=true;
async GetOrderByBarcode() {
  this.spinner.show();
  this.getMixinOrderByBarcode(this.barcode);
//   this.selectedOrderforBarcode=localStorage.getItem('orderForBarcode');
//   localStorage.removeItem('orderForBarcode');
//   if(this.selectedOrderforBarcode != null)
//   {
//     this._router.navigate(['/mixinorderview',this.selectedOrderforBarcode]);
//   }
//   else{
//     this.hasorderforbarcode=false;
//     setTimeout(() => {
//       this.hasorderforbarcode=true;
//     }, 1000);
//   }
this.spinner.hide();
}

async getMixinOrderByBarcode(barcode:any) {
  this.httpProvider.getMixinOrderByBarcode(barcode, localStorage.getItem('CurrentOfficeId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      this._router.navigate(['/mixinorderview',resultData.id]);
      // localStorage.setItem('orderForBarcode',resultData.id);
    }
    else{
      this.hasorderforbarcode=false;
      setTimeout(() => {
        this.hasorderforbarcode=true;
      }, 1000);
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            localStorage.removeItem('orderForBarcode');
          }
      }
      else{
        localStorage.removeItem('orderForBarcode');
        this.hasorderforbarcode=false;
        setTimeout(() => {
          this.hasorderforbarcode=true;
        }, 1000);
      }
    }
    });
   
}

refreshList() {
  this.spinner.show();
this.getAllSessionsByOfficeAndModule();
this.spinner.hide();
}

async mixinOrdersForSession(session: any) {
  this._router.navigateByUrl('/mixinsessionorderlist',session.id);
}

}
