import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { VoteAssignment } from '../mix-income-management/models/VoteAssignment';
import { VoteAssignmentFullDataClass } from '../mix-income-management/models/VoteAssignment';
import { MixinOrder } from '../mix-income-management/models/MixinOrder';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../common/models/pagination.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxBarcode6Component } from 'ngx-barcode6';
import { interval, Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Banking } from '../common/models/Banking';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})

export class BankingComponent implements OnInit {

  // displayedColumns: string[] = ['position','date','code', 'cashamount', 'chequeamount','chequenumber',  'actions'];
  // dataSource = new MatTableDataSource<MixinOrder>([]);
  // paginator: MatPaginator;
  // @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
  //    this.paginator = paginator;
  //    this.dataSource.paginator = this.paginator;
  //  }

  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  // @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };
  // @Output() paginated = new EventEmitter<PageEvent>();
  // p: number = 1;
  

checkedData = [];  
selectedDate:any; 
bankingList: Banking[] = new Array();
totalcash:number =0;
totalcheque:number=0;

APIBankAccountsList :any;
bankAccountID:number=0;
filteredOrders:any = [];
  // selectedofficeId:any;
  // selectedOrderStatus :any=1;
  // selectedVoteDetailsItems :any=[];
  // formdata :any=[];
  // VoteDetailsDropdownSettings:IDropdownSettings={};

  // APIOfficesList : any;
  // selectedOfficesItems :any=[];
  // OfficesDropdownSettings:IDropdownSettings={};

  // APIBankAccountsList : any;
  // selectedBankAccountsItems :any=[];
  // BankAccountsDropdownSettings:IDropdownSettings={};

  // selectedVotesandBankAccountsListwithOffices :any=[];

  // selectedVoteAssignment: VoteAssignment = new VoteAssignment();
  // voteAssignments!: VoteAssignment[];

  // selectedVoteAssignmentDetail:any=[];

  // public voteSearchKeyword = 'voteCode';
  // public historyHeading: string = 'Recently selected';
  // public placeholder: string = 'Enter the Vote Code';

  // headerTitle :any ="Purchase Orders";
  // headerDescription :any ="Use to create Purchase Orders of Kohoku Lanka Read more";

  // loading = false;
  doc: any;
  reportpreview: SafeResourceUrl;
  reportdate:String;

  APIMixinOrdersCashbook: any=[];
  APIMixinOrders: any=[];
  filterSelectObj:any = [];
  filterValues:any = {};
  // selectedOrderforBarcode: any;
  // SelectedVoteName :any;
  // SelectedVoteId : any;
  // isValid : boolean;
  // objIncomeTitle : any;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  // isEditing:boolean = false;

  constructor(private datepipe: DatePipe,private httpProvider: HttpProviderService, private sanitizer: DomSanitizer, private fb: FormBuilder,private _router: Router,private spinner: NgxSpinnerService) {
    
    // Object to create Filter for
    this.filterSelectObj = [
      // {
      //   name: 'ID',
      //   columnProp: 'id',
      //   options: []
      // }
      // , {
      //   name: 'NAME',
      //   columnProp: 'name',
      //   options: []
      // }, {
      //   name: 'USERNAME',
      //   columnProp: 'username',
      //   options: []
      // }, {
      //   name: 'EMAIL',
      //   columnProp: 'email',
      //   options: []
      // }, 
      {
        name: 'accountDetailId',
        columnProp: 'accountDetailId',
        options: []
      }
    ]
    // this.customVoteNameForm = this.fb.group({  
    //   offices: '',  
    //   assignedVotes: '',  
    //   customVoteNames: this.fb.array([]) ,  
    // });  
  }

  isadmin:boolean=false;

//   bcValue:any=0;

//   elementType = 'svg';
//   value = 'someValue12340987';
//   format = 'CODE128';
//   lineColor = '#000000';
//   width = 2;
//   height = 100;
//   displayValue = true;
//   fontOptions = '';
//   font = 'monospace';
//   textAlign = 'center';
//   textPosition = 'bottom';
//   textMargin = 2;
//   fontSize = 20;
//   background = '#ffffff';
//   margin = 10;
//   marginTop = 10;
//   marginBottom = 10;
//   marginLeft = 10;
//   marginRight = 10;

//   get values(): string[] {
//     return this.value.split('\n');
//   }
//   codeList: string[] = [
//     '', 'CODE128',
//     'CODE128A', 'CODE128B', 'CODE128C',
//     'UPC', 'EAN8', 'EAN5', 'EAN2',
//     'CODE39',
//     'ITF14',
//     'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
//     'pharmacode',
//     'codabar'
//   ];

  
// subscription: Subscription;
// source = interval(60000);


  ngOnInit() {
    // this.spinner.show();
    this.checkPermission("BANKING", Number(localStorage.getItem('Currentuserid')));
    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}
    
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // this.getAllCashBookForOfficeId();
    this.refresh();
    // this.subscription = this.source.subscribe(val =>  this.getAllMixinOrdersForOfficeAndState(this.selectedOrderStatus));


    // this.VoteDetailsDropdownSettings = {
    //   idField: 'id',
    //   textField: 'voteCode',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // this.selectedVoteDetailsItems = [
    //   // { id: 9, code: '450-01-11' }
    // ];

    // this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    // if (this.SelectedLanguage=="Sinhala")
    // {
    //   this.OfficesDropdownSettings = {
    //   idField: 'id',
    //   textField: 'nameSinhala',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // this.BankAccountsDropdownSettings = {
    //   idField: 'id',
    //   textField: 'nameSinhala',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // }

    // if (this.SelectedLanguage=="Tamil")
    // {
    //   this.OfficesDropdownSettings = {
    //   idField: 'id',
    //   textField: 'nameTamil',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // this.BankAccountsDropdownSettings = {
    //   idField: 'id',
    //   textField: 'nameTamil',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // }

    // if (this.SelectedLanguage=="English")
    // {
    //   this.OfficesDropdownSettings = {
    //   idField: 'id',
    //   textField: 'nameEnglish',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // this.BankAccountsDropdownSettings = {
    //   idField: 'id',
    //   textField: 'nameEnglish',
    //   singleSelection: true,
    //   // selectAllText: 'Select All',
    //   // unSelectAllText: 'UnSelect All',
    //   // itemsShowLimit: 10,
    //   allowSearchFilter: true
    // };
    // }
    // this.spinner.hide();

        // this.sdeptname = data;
        // this.dataSource.data = (data as Element[]);
        // this.checkedDataSource.data = this.data;  
  }


 LoadReport(date:any)
 {
  if(date!=null)
    {
  let selecteddateformatted = this.datepipe.transform(date, 'yyyy-MM-dd');
  this.reportdate=String(selecteddateformatted);
  let officeid=Number(localStorage.getItem('CurrentOfficeId'));
  let officename=localStorage.getItem('CurrentSabhaName') + " - " + localStorage.getItem('CurrentOfficeName');
  setTimeout(() => {
  //console.log(this.selectedsession);
  this.doc='https://cat2020.lk/birt/output?__report=bankdepositreceiptsbyaccount.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&date='+selecteddateformatted+'';

  // this.doc='https://cat2020.lk/birt/frameset?__report=sarapdailyreportforoffice.rptdesign&__format=pdf&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'';
  //console.log(this.doc);
  // this.mypreview= this.sanitizer.bypassSecurityTrustResourceUrl(this.doc);

  // window.open(this.doc, "_blank"); 
  this.reportpreview= this.sanitizer.bypassSecurityTrustHtml(
    '<iframe width="100%" height="1000" allowTransparency="true" frameborder="0" src='+this.doc+'></iframe>',
  );

  // let winUrl:any = URL.createObjectURL(new Blob([this.doc], { type: 'text/html' }));
  // window.open(this.doc);
  }, 2000);

  // this.getAllCancelledMixinOrders(selecteddateformatted);
  // this.getAllPostedMixinOrders(selecteddateformatted);
}
else{
  Notify.failure("Please Enter all parameters.");
}
 }


  refresh()
  {
    this.totalcash=0;
    this.totalcheque=0;
    
    this.getAllMixinOrdersForOffice();
    this.getAllAccountDetail();
    this.LoadReport(new Date());
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj:any, key:any) {
    // console.log(fullObj);
    const uniqChk:any = [];
    fullObj.filter((obj:any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  filterChange(filter:any, event:any) {
    //let filterValues = {}
    // this.filterValues[filter.columnProp] = '38'
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    // console.log(this.filterValues);

    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value:any, key:any) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  getTotalCash()
  {
    this.totalcash = this.checkedDataSource.data.filter(itm=> itm.paymentMethodId===1).map(t => t.totalAmount).reduce((acc, value) => acc + value, 0);
    return this.totalcash;
  }

  getTotalCheque()
  {
    this.totalcheque = this.checkedDataSource.data.filter(itm=> itm.paymentMethodId===2).map(t => t.totalAmount).reduce((acc, value) => acc + value, 0);
    return this.totalcheque;
  }


  displayedColumns = ['select', 'date', 'code', 'cashamount', 'chequeamount','chequenumber'];
  data = Object.assign(ELEMENT_DATA);
  
  dataSource = new MatTableDataSource<MixinOrder>(this.APIMixinOrdersCashbook);
  selection = new SelectionModel<MixinOrder>(true, []);

  checkedDataSource = new MatTableDataSource<MixinOrder>(this.checkedData);
  checkedSelection = new SelectionModel<MixinOrder>(true, []);

  uncheckedData = this.data;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('checkedpaginator') checkedpaginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.checkedDataSource.paginator = this.checkedpaginator;
  }
  
  /** Whether the number of selected elements matches the total number of rows. */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllCheckedSelected() {
    const numSelected = this.checkedSelection.selected.length;
    const numRows = this.checkedDataSource.data.length;
    return numSelected === numRows;
  }



/* Function to move row from table 1-->2 */

  moveToTableTwo() {
      //  console.log(this.dataSource.data)
      this.selection.selected.forEach((k,item) => {

        this.dataSource.data.splice(this.dataSource.data.indexOf(k),1); 
        this.checkedDataSource.data.push(k);
      });
      // console.log(this.dataSource.data)
      this.dataSource = new MatTableDataSource<MixinOrder>(this.dataSource.data);
      this.checkedDataSource = new MatTableDataSource<MixinOrder>(this.checkedDataSource.data);
      // this.selection=new SelectionModel<Element>(true, []);
      this.selection.clear();
      // this.selection = new SelectionModel<MixinOrder>(true, []);
      // this.selection.deselect;
      // this.selection.clear();
    }


/* Function to move row from table 2-->1 */

  moveToTableOne() {
        // console.log(this.checkedDataSource.data)
      this.selection.selected.forEach((item) => {
        let index: number = this.dataSource.data.findIndex(d => d === item);
        this.checkedDataSource.data.splice(index,1); 
        this.dataSource.data.push(item);
      });
      // console.log(this.dataSource.data)
      this.dataSource = new MatTableDataSource<MixinOrder>(this.dataSource.data);
      this.checkedDataSource = new MatTableDataSource<MixinOrder>(this.checkedDataSource.data);
      this.selection = new SelectionModel<MixinOrder>(true, []);
  }

 
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  
  masterToggle() {
    this.isAllSelected() ? 
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    // console.log(this.data);
  }

  masterCheckedToggle() {
    this.isAllCheckedSelected()?
      this.checkedSelection.clear() : this.dataSource.data.forEach(row => this.checkedSelection.select(row));
  }

reset(){
  // this.bankAccountID=0;
  // this.dataSource = new MatTableDataSource<MixinOrder>([]);
  this.checkedDataSource = new MatTableDataSource<MixinOrder>([]);
  this.getAllCashBookForOfficeIdBankAccountId(this.bankAccountID);
}
  getColor(cashbookrow:MixinOrder,allMixinOrders:any){
    let lastsessionid=allMixinOrders.at(-1)?.sessionId;
    // console.log(lastsessionid);
    if(cashbookrow.sessionId==lastsessionid)
    {
    return 'rgb(0, 232, 248)';
    }
    else
    {
    return 'rgb(255, 243, 134)';
    }
    }

    onbankaccountchange(id:number){
      this.bankAccountID=id;
      this.getAllCashBookForOfficeIdBankAccountId(id);
    }
    // selectedColumnId: number;
    // applyFilter(id: Number) {
    //   const filterValue = id;
    //   const column = this.columns.find(c => c.id === this.selectedColumnId);
    //   this.dataSource.filter = `${column.name.trim().toLowerCase()}:${filterValue.trim().toLowerCase()}`;
    // }
      
    applyFilter(filterValue: Number) {
      
      const tableFilters = [];
      tableFilters.push({
        id: 'accountDetailId',
        value: filterValue
      });
  // console.log();
  
      this.dataSource.filter = JSON.stringify(tableFilters);
      // if (this.dataSource.paginator) {
      //   this.dataSource.paginator.firstPage();
      // }
    }

    async getAllAccountDetail() {
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

  haspermission :Boolean;

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
  // customVoteNameForm: FormGroup;  
     
  // customVoteNames() : FormArray {  
  //   return this.customVoteNameForm.get("customVoteNames") as FormArray  
  // }  
     
  // newCustomVoteName(): FormGroup {  
  //   return this.fb.group({  
  //     customvotename: ''
  //   })  
  // }  
     
  // addCustomVoteName() {  
  //   this.customVoteNames().push(this.newCustomVoteName());  
  // }  
     
  // removeCustomVoteName(i:number) {  
  //   this.customVoteNames().removeAt(i);  
  // }  
     
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

// onVoteSelect(item: any) {
//   //   this.objIncomeTitle = this.getAllMixinOrder.find((obj:any) => obj.id == item.id);
//   //  this.SelectedVoteId=this.objIncomeTitle.id;
//   //  if (this.isSinhala) 
//   //  this.SelectedVoteName=this.objIncomeTitle.voteNameSinahala;
//   //   if (this.isTamil) 
//   //   this.SelectedVoteName=this.objIncomeTitle.voteNameTamil;
//   //   if (this.isEnglish) 
//   //   this.SelectedVoteName=this.objIncomeTitle.voteNameEnglish;;
// }
// onVoteDeSelect(item: any) {
//     // console.log('onItemDeSelect', item);
//     this.SelectedVoteName="";
//     this.SelectedVoteId=0;
// }
// onVoteSelectAll(items: any) {
//     // console.log('onSelectAll', items);
// }
// onVoteUnSelectAll() {
//     // console.log('onUnSelectAll fires');
// }


//   async onChangeVote(selectedVote:any) {
//     if (this.isSinhala) 
//     this.SelectedVoteName=selectedVote.nameSinhala;
//     if (this.isTamil) 
//     this.SelectedVoteName=selectedVote.nameTamil;
//     if (this.isEnglish) 
//     this.SelectedVoteName=selectedVote.nameEnglish;
//     this.SelectedVoteId = selectedVote.id;
//   }

  // onChangeSearch(search: string) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  // }
  
  // onFocused(e:void) {
  //   // do something
  // }

async getAllCashBookForOfficeId() {
  this.dataSource = new MatTableDataSource<MixinOrder>([]);
  this.APIMixinOrdersCashbook=[];
  this.httpProvider.getAllCashBookForOfficeId(localStorage.getItem('CurrentOfficeId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      this.APIMixinOrdersCashbook = resultData;
        this.dataSource.data=this.APIMixinOrdersCashbook;
        this.filterSelectObj.filter((o:any) => {
          o.options = this.getFilterObject(this.APIMixinOrdersCashbook, o.columnProp);
        });
        // console.log(this.APIMixinOrdersCashbook);
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIMixinOrdersCashbook =[];
          }
      }}
    });
}

async getAllCashBookForOfficeIdBankAccountId(bankaccid:number) {
  this.dataSource = new MatTableDataSource<MixinOrder>([]);
  this.APIMixinOrdersCashbook=[];
  this.httpProvider.getAllCashBookForOfficeIdBankAccountId(localStorage.getItem('CurrentOfficeId'),bankaccid).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      this.APIMixinOrdersCashbook = resultData;
        this.dataSource.data=this.APIMixinOrdersCashbook;
        this.filterSelectObj.filter((o:any) => {
          o.options = this.getFilterObject(this.APIMixinOrdersCashbook, o.columnProp);
        });
        // console.log(this.APIMixinOrdersCashbook);
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIMixinOrdersCashbook =[];
          }
      }}
    });
}

async getAllMixinOrdersForOffice() {
  this.APIMixinOrders=[];
  this.httpProvider.getAllMixinOrdersForOffice(localStorage.getItem('CurrentOfficeId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      this.APIMixinOrders = resultData;
      // console.log(this.APIMixinOrders);
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



submitButtonClickCount:number=1;

saveBanking(selectedDate:Date)  {  
  if(this.submitButtonClickCount==1)
  {
  this.submitButtonClickCount=this.submitButtonClickCount+1;
  if (confirm(`Are you sure you want save the banking data ?`)) {
    let selecteddatefrompicker = this.datepipe.transform(selectedDate, 'yyyy-MM-dd');
    
    var unixtimestamptodayDate = (new Date()).getTime() / 1000;
    var unixtimestampselectedDate = (new Date(selectedDate)).getTime() / 1000;
    if (unixtimestampselectedDate<unixtimestamptodayDate) {
    if (this.checkedDataSource.data.length > 0) {

      let SelectedMixinOrderList:MixinOrder[];
      SelectedMixinOrderList=this.checkedDataSource.data;
      SelectedMixinOrderList.forEach((item) => {
        let banking:Banking = new Banking();
        banking.id=0;
        banking.orderId=Number(item.id);
        banking.bankedDate=selecteddatefrompicker!;
        banking.createdAt=new Date();
        banking.createdBy=Number(localStorage.getItem('Currentuserid'));
        // banking.mixinOrder=item;
        this.bankingList.push(banking);
      });
      console.log(this.bankingList);
     this.httpProvider.saveBanking(this.bankingList)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           this.bankingList = [];
           this.dataSource.data=[];
           this.checkedDataSource.data=[];
           Notify.success('Banking Saved Successfully..!');
           this.submitButtonClickCount=1;
      },
      error: error => {
         Notify.failure('Error Occured..!');
         this.submitButtonClickCount=1;
      }
  });
  setTimeout(() => {
  // this.currentSession = new Session();
  this.refresh();
  }, 2000);

  }
  else{
    Notify.failure('Please select data to banking list before save..!');
    this.submitButtonClickCount=1;
  }
}
else{
  Notify.failure('Please select a correct Banking Date..!');
  this.submitButtonClickCount=1;
}
  }
  }
  this.submitButtonClickCount=1;
}



async startCustomSessionAPI(sessiondatetobecreated:any) {
 
}

// async getAllAccountdetails() {
//   this.httpProvider.getAllAccountDetail(localStorage.getItem('sabhaId')).subscribe({
//     next: (data) => {
//     if (data != null && data.body != null) {
//       var resultData = data.body;
//       if (resultData) {
//         this.APIBankAccountsList = resultData;
//       }
//     }
//   },
//   error: error => {
//         if (error.status == 404) {
//           if(error.error && error.error.message){
//             Notify.failure(error.error.message);
//             this.APIBankAccountsList = [];
//           }
//       }}
//     });
// }

// async getAllOffices() {
//   this.httpProvider.getAllOfficesForSabhaId(localStorage.getItem('sabhaId')).subscribe({
//     next: (data) => {
//     if (data != null && data.body != null) {
//       var resultData = data.body;
//       if (resultData) {
//         this.APIOfficesList = resultData;
//       }
//     }
//   },
//   error: error => {
//         if (error.status == 404) {
//           if(error.error && error.error.message){
//             Notify.failure(error.error.message);
//             this.APIOfficesList = [];
//           }
//       }}
//     });
// }

//   async saveRecord() {
//     this.formdata=this.customVoteNameForm.value;
//     if(this.isEditing==false){
//     //  if (this.formdata.assignedVotes==null || this.formdata.assignedVotes==""){
//     //   this.isValid=false; Notify.warning('Please select a vote');
//     //  }
//      if (this.SelectedVoteId==null || this.SelectedVoteId==0){
//       this.isValid=false; Notify.warning('Please select a vote');
//      }
//     //  else if(this.formdata.customVoteNames.length==0 || this.formdata.customVoteNames[0].customvotename=="") {
//     //      this.isValid=false; Notify.warning('Please Enter a Custom Vote Name');
//     // }
//     else{
//       this.isValid=true;
//     }
//   }
//   else{this.isValid=true;}
//     if (this.isValid==true) {
//       if (this.isValid==true && this.isEditing==false) {

//       if (this.formdata.assignedVotes==null || this.formdata.assignedVotes==""){ 
//       this.formdata.customVoteNames.forEach((voteAssignDetail:any) => {
//         if(voteAssignDetail.customvotename!="")
//         {
//           this.selectedVoteDetailsItems.push({
//             id: 0,
//             voteAssignmentId: this.formdata.assignedVotes,
//             customVoteName: voteAssignDetail.customvotename,
//             isActive: 1,
//             dateCreated: null,
//             dateModified:null
//           });
//         }
//         });
//       }
//       else{
//         if(this.SelectedVoteId!=0 && this.SelectedVoteName!="")
//         {
//           this.selectedVoteDetailsItems.push({
//             id: 0,
//             voteAssignmentId: this.SelectedVoteId,
//             customVoteName: this.SelectedVoteName,
//             isActive: 1,
//             dateCreated: null,
//             dateModified:null
//           });
//         }
//       }
//     }
//     // if (this.isValid==true && this.isEditing==true) {
//     //   this.selectedVoteDetailsItems.forEach((vote:any) => {
//     //       this.selectedVotesandBankAccountsListwithOffices.push({
//     //         id: this.selectedVoteAssignmentDetail.id,
//     //         voteAssignmentId: this.selectedVoteAssignmentDetail.voteAssignmentId,
//     //         isActive: 1,
//     //         dateCreated: null,
//     //         dateModified:null,
//     //       });
//     //     });
//     // }
//     this.spinner.show();
//   this.httpProvider.saveMixinOrderDetail(this.selectedVoteDetailsItems)
//   .subscribe({
//     next: (result) => {
//          var resultData = result.body;
//          Notify.success('Mixin Order Created successfully..!');
//     },
//     error: error => {
//       Notify.failure('Error Occured..!');
//     }
// });
// setTimeout(() => {
// this.clearRecord() ;
// this.spinner.hide();
// // this.getAllVoteAssignmentsForOfficeId(this.selectedofficeId);
// }, 5000);
// }
// }

  // clearRecord() {
  //   this.customVoteNameForm.reset();  
  //   this.customVoteNameForm.controls['offices'].setValue(this.selectedofficeId);
  //   this.selectedVoteDetailsItems=[];
  //   this.SelectedVoteName="";
  //   this.SelectedVoteId=0;
  //   // this.selectedBankAccountsItems=[];
  //   // this.selectedOfficesItems=[];

  //   // this.selectedVoteAssignment = new VoteAssignment();
  //   // this.SelectedVoteName="";
  //   // this.isEditing=false;
  // }

  // // async cancelMixinOrder(mixinOrder: any) {
  // //   this.loading = true;
  // //   if (confirm(`Are you sure you want to cancel the Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
  // //     this.httpProvider.cancelMixinOrder(mixinOrder.id)
  // //     .subscribe({
  // //       next: (data) => {
  // //            var resultData = data.body;
  // //            Notify.success('Mixin Order Sent for Cancel Approval.');
  // //       },
  // //       error: error => {
  // //         Notify.failure('Error Occured..!');
  // //       }
  // //   });
  // //   setTimeout(() => {
  // //     //this.clearRecord() ;
  // //     this.getAllMixinOrdersForOfficeAndState(this.selectedOrderStatus);
  // //     }, 1000);
  // // }
  // // }

  // async printMixinOrder(mixinOrder: any) {
  // }

  // async viewMixinOrder(mixinOrder: any) {
  //   this._router.navigateByUrl('/mixinorderview',mixinOrder.id);
  // }
  

// editVoteAssignment(voteAssignment: VoteAssignmentFullDataClass) {
//   this.isEditing=true;
//   this.selectedVoteAssignment = voteAssignment;
//     this.selectedVoteDetailsItems = [
//        { id: voteAssignment.voteId, code: voteAssignment.voteDetail.code }
//     ];
    
//     if (this.isSinhala) 
//     this.selectedOfficesItems = [
//       { id: voteAssignment.officeId, nameSinhala: voteAssignment.office.nameSinhala}
//     ];
//     this.selectedBankAccountsItems = [
//       { id: voteAssignment.bankAccountId, nameSinhala: voteAssignment.accountDetail.nameSinhala}
//       ];

//     if (this.isTamil) 
//     this.selectedOfficesItems = [
//       { id: voteAssignment.officeId, nameTamil: voteAssignment.office.nameTamil }
//     ];
//     this.selectedBankAccountsItems = [
//       { id: voteAssignment.bankAccountId, nameTamil: voteAssignment.accountDetail.nameTamil }
//       ];

//     if (this.isEnglish) 
//     this.selectedOfficesItems = [
//       { id: voteAssignment.officeId, nameEnglish: voteAssignment.office.nameEnglish }
//     ];
//     this.selectedBankAccountsItems = [
//       { id: voteAssignment.bankAccountId, nameEnglish: voteAssignment.accountDetail.nameEnglish }
//       ];
// }

// barcode :any;
// hasorderforbarcode :boolean=true;
// async GetOrderByBarcode() {
//   this.spinner.show();
//   this.getMixinOrderByBarcode(this.barcode);
// //   this.selectedOrderforBarcode=localStorage.getItem('orderForBarcode');
// //   localStorage.removeItem('orderForBarcode');
// //   if(this.selectedOrderforBarcode != null)
// //   {
// //     this._router.navigate(['/mixinorderview',this.selectedOrderforBarcode]);
// //   }
// //   else{
// //     this.hasorderforbarcode=false;
// //     setTimeout(() => {
// //       this.hasorderforbarcode=true;
// //     }, 1000);
// //   }
// this.spinner.hide();
// }

// async getMixinOrderByBarcode(barcode:any) {
//   this.httpProvider.getMixinOrderByBarcode(barcode, localStorage.getItem('CurrentOfficeId')).subscribe({
//     next: (data) => {
//     if (data != null && data.body != null) {
//       var resultData = data.body;
//       this._router.navigate(['/mixinorderview',resultData.id]);
//       // localStorage.setItem('orderForBarcode',resultData.id);
//     }
//     else{
//       this.hasorderforbarcode=false;
//       setTimeout(() => {
//         this.hasorderforbarcode=true;
//       }, 1000);
//     }
//   },
//   error: error => {
//         if (error.status == 404) {
//           if(error.error && error.error.message){
//             Notify.failure(error.error.message);
//             localStorage.removeItem('orderForBarcode');
//           }
//       }
//       else{
//         localStorage.removeItem('orderForBarcode');
//         this.hasorderforbarcode=false;
//         setTimeout(() => {
//           this.hasorderforbarcode=true;
//         }, 1000);
//       }
//     }
//     });
   
// }

// refreshList() {
//   this.spinner.show();
// this.getAllCashBookForOfficeId();
// this.spinner.hide();
// }

}

export interface Element {
  sdeptname:any;  
}

const ELEMENT_DATA: Element[] = [];