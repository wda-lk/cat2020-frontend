import { Component, Injectable, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { VoteAssignment } from '../../models/VoteAssignment';
import { Partner } from '../../../common/models/Partner';
import { MixinOrder } from '../../../mix-income-management/models/MixinOrder';
import { HttpProviderService } from '../../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../common/models/pagination.model';
import { PageEvent } from '@angular/material/paginator';
import { MixinOrderLine } from '../../models/MixinOrderLine';
import { Observable, of, Subscription, ReplaySubject, Subject } from 'rxjs';
import { tap, finalize, startWith, debounceTime, switchMap, map, filter, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Office } from 'src/app/common/models/Office';
import { UserDetail } from 'src/app/user-management/models/UserDetail';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {DatePickerComponent} from 'ng2-date-picker';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { Session } from '../../../common/models/Session';

@Component({
  selector: 'app-mixinorderaddedit',
  templateUrl: './mixinorderaddedit.component.html',
  styleUrls: ['./mixinorderaddedit.component.scss']
})

export class MixinOrderAddEditComponent implements OnInit {

  @ViewChild('dayPicker') dayPicker: DatePickerComponent;

  currentSession : Session = new Session();
  loading = false;
  mixinOrderItems: MixinOrderLine[] = new Array();
  mixinOrder : MixinOrder = new MixinOrder();
  APIVoteAssignmentsForOfficeList:any[];
  APICustomVoteNamesForOfficeList:any[];
  APIAllPartnersList:any;
  APIAllGnDivionsListForOffice:any;
  APIAllCustomVotesListForOffice:any;
  APIAllBalanceSheetTitle:any;
  APIAllBalanceSheetSubTitle:any;
  APIVatPercentage:number;
  APINbtPercentage:number;
  receiptNumber:any;
  selectedCustomer : Partner = new Partner();
  isValid = false;
  isValidItem = false;
  SelectedVoteName :any;
  SelectedVoteId : any;
  objVoteAssignmentDetail :any;
  VoteDetailsDropdownSettings:IDropdownSettings={};
  selectedVoteAssignmentDetail:any=[];
  dataSource = new MatTableDataSource<VoteAssignment>([]);
  APIBalancesheettitleList :any;
  APIBalancesheetsubtitleListBybalancetitle :any;
  TitleID:any=0;
  selectedBalancesheetSubTitle:any  ;
  selectedBalancesheetSubTitleID:any=0;
  selectedBalancesheetSubTitleName:any;
  objBalanceSheetSubtitle:any;
  objBalanceSheettitle:any;
  allitemstotal:number=0;
  itemVoteCode:any;

  vatChecked: boolean = false;
  nbtChecked: boolean = false;
  stampChecked: boolean = false;

  cashChecked: boolean = false;
  chequeChecked: boolean = false;
  crossChecked: boolean = false;

  // Other variables
  IsForUpdate: boolean = false;
  newMixinOrderItem: any = {};
  updatedItem:any;
  selectedVoteCode:any;

  chosenPaymentOption:any;
  
  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  isEditing:boolean = false;
  clicked = false;
  submitButtonClickCount :number = 1;

  paymentOptions = [
    { "name": "Cash", id: "1", "checked": true},
    { "name": "Cheque", id: "2", "checked": false},
    { "name": "Cross", id: "3", "checked": false},
    { "name": "Direct", id: "4", "checked": false}
];

  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder, private _router: Router,public dialog: MatDialog,public datepipe: DatePipe,private spinner: NgxSpinnerService) {
    this.mixinOrderItems.push(
    );
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


  AddItem() {
    if (this.SelectedVoteId==0  || this.newMixinOrderItem.voteOrBal==0) {
      this.isValidItem=false; Notify.warning('Please select a Vote/Balance Sheet');
    } 
    else if (this.newMixinOrderItem.customVoteName ==  undefined) {
      this.isValidItem=false; Notify.warning('Please select a Vote/Balance Sheet');
    } 
    else if (this.newMixinOrderItem.amount == undefined || this.newMixinOrderItem.amount == 0){
      this.isValidItem=false; Notify.warning('Please Enter the Amount');
    } 
    else{this.isValidItem=true;}
  
    if (this.isValidItem==true) {
      this.spinner.show();
      if(this.newMixinOrderItem.description==undefined)
      {
        this.newMixinOrderItem.description = this.newMixinOrderItem.customVoteName;
      }
      else{
    this.newMixinOrderItem.description = this.newMixinOrderItem.customVoteName +" - "+ this.newMixinOrderItem.description;
      }

    // this.calculateTotalAmount();

    this.newMixinOrderItem.id=0
    this.newMixinOrderItem.Vote=0
    this.newMixinOrderItem.createdAt=Date.now;
    this.newMixinOrderItem.updatedAt=Date.now;
    this.newMixinOrderItem.paymentVatId=1
    this.newMixinOrderItem.paymentNbtId=1
    this.newMixinOrderItem.mixinOrderId=1
    this.newMixinOrderItem.mixinOrderId=1
    this.newMixinOrderItem.voteCode=this.selectedVoteCode;

    this.allitemstotal = Number(this.allitemstotal)+Number(this.newMixinOrderItem.totalAmount);

    this.mixinOrderItems.push(
      this.newMixinOrderItem
    );
console.log('item added:' + this.newMixinOrderItem);
console.log('items List:' + this.mixinOrderItems);

    this.newMixinOrderItem = {};
    this.spinner.hide();
    }
    this.clearOrderItem();
  }

   EditItem(i:any) {
    this.newMixinOrderItem.customVoteName = this.mixinOrderItems[i].customVoteName;
    this.newMixinOrderItem.description = this.mixinOrderItems[i].description;
    this.updatedItem = i;
    this.IsForUpdate = true;
  }

  UpdateItem() {
    let data = this.updatedItem;
    for (let i = 0; i < this.mixinOrderItems.length; i++) {
      if (i == data) {
        this.mixinOrderItems[i].customVoteName = this.newMixinOrderItem.customVoteName;
        this.mixinOrderItems[i].description = this.newMixinOrderItem.description;
      }
    }
    this.IsForUpdate = false;
    this.newMixinOrderItem = {};
  }

  DeleteItem(i:any) {
    this.allitemstotal = Number(this.allitemstotal)-Number(this.mixinOrderItems[i].amount);
    this.mixinOrderItems.splice(i, 1);
  }
  isadmin:boolean=false;


  ngOnInit() {

    this.spinner.show();

   this.checkPermission("MXORDERADDEDIT", Number(localStorage.getItem('Currentuserid')));
  //  if(Number(localStorage.getItem('IsAdmin'))==1)
  //  {this.isadmin=true;}
   this.getSession();
  this.refresh();

  this.VoteDetailsDropdownSettings = {
    idField: 'id',
    textField: 'voteCode',
    singleSelection: true,
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 10,
    allowSearchFilter: true
  };

  this.newMixinOrderItem.stampAmount=0.00;
  this.spinner.hide();
  }

  async getSessionByOfficeAndModule(officeid:number,module:any) {
    this.httpProvider.getSessionByOfficeAndModule(officeid,module).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.currentSession = resultData;
          localStorage.setItem('MixSessionId',this.currentSession.id.toString());
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

  getSession(){
    this.getSessionByOfficeAndModule(Number(localStorage.getItem('CurrentOfficeId')), "MIX");
  }

  onVoteSelect(item: any) {
    
    this.newMixinOrderItem.voteOrBal=1;

    this.objVoteAssignmentDetail = this.APICustomVoteNamesForOfficeList.find((obj:any) => obj.id == item.id);
    this.SelectedVoteId=this.objVoteAssignmentDetail.id;
    this.SelectedVoteName=this.objVoteAssignmentDetail.customVoteName;
    this.newMixinOrderItem.mixinVoteAssignmentDetailId=this.objVoteAssignmentDetail.id;
    this.newMixinOrderItem.customVoteName=this.objVoteAssignmentDetail.customVoteName;
    this.selectedVoteCode=this.objVoteAssignmentDetail.voteCode;

    this.selectedBalancesheetSubTitleName="";
    this.selectedBalancesheetSubTitleID=0;
    // this.newMixinOrderItem.description=this.objVoteAssignmentDetail.customVoteName + "-";
    this.selectedBalancesheetSubTitle=0;
    this.TitleID=0;
  }
  onVoteDeSelect(item: any) {
    this.selectedVoteCode="";
      this.SelectedVoteName="";
      this.SelectedVoteId=0;
      this.newMixinOrderItem.customVoteName="";
      this.newMixinOrderItem.mixinVoteAssignmentDetailId=0;
  }
  onVoteSelectAll(items: any) {
      // console.log('onSelectAll', items);
  }
  onVoteUnSelectAll() {
      // console.log('onUnSelectAll fires');
  }

  async refresh() {
    this.getAllPartners();
    this.getAllGnDivisionsForSabha();
    this.getAllVoteAssignmentDetailsForOffice();
    this.getAllBalancesheetTitles();
    this.getAllVoteAssignmentsForOffice();
    this.getVatPercentage();
    this.getNbtPercentage();

    this.selectedCustomer.gnDivisionId=0;
    this.selectedBalancesheetSubTitle=0;
    this.TitleID=0;

    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}
    }

async getAllPartners() {
  this.httpProvider.getAllPartners().subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAllPartnersList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAllPartnersList = [];
          }
      }}
    });
}

async getAllBalancesheetSubtitleByTitleID(id:any) {

  this.newMixinOrderItem.customVoteName="";
  this.SelectedVoteName="";
  this.SelectedVoteId=0;
  this.selectedVoteAssignmentDetail=[];

  this.httpProvider.getAllBalancesheetSubtitleByTitleID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIBalancesheetsubtitleListBybalancetitle = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIBalancesheetsubtitleListBybalancetitle = [];
          }
      }}
    });
}

onchangebalancesheetsubtitle(id : any)

{
// console.log(this.APIBalancesheettitleList);

  this.objBalanceSheettitle = this.APIAllBalanceSheetTitle.find((obj:any) => obj.id == this.TitleID);
// console.log(this.objBalanceSheettitle);

  this.newMixinOrderItem.voteOrBal=2

  this.objBalanceSheetSubtitle = this.APIBalancesheetsubtitleListBybalancetitle.find((obj:any) => obj.id == id);
  this.selectedBalancesheetSubTitleID=this.objBalanceSheetSubtitle.id;

  if (this.isSinhala) 
  {
  this.selectedBalancesheetSubTitleName=this.objBalanceSheetSubtitle.nameSinhala;
  this.selectedVoteCode = this.objBalanceSheetSubtitle.nameSinhala;
  }
    if (this.isTamil) 
    {
    this.selectedBalancesheetSubTitleName=this.objBalanceSheetSubtitle.isTamil;
    this.selectedVoteCode=this.objBalanceSheetSubtitle.isTamil;
    }
    if (this.isEnglish) 
    {
    this.selectedBalancesheetSubTitleName=this.objBalanceSheetSubtitle.isEnglish;
    this.selectedVoteCode=this.objBalanceSheetSubtitle.isEnglish;
    }
    this.newMixinOrderItem.mixinVoteAssignmentDetailId=this.objBalanceSheetSubtitle.id;
    this.newMixinOrderItem.customVoteName=this.selectedBalancesheetSubTitleName;
    this.SelectedVoteId=this.objBalanceSheetSubtitle.id;

    // console.log(this.newMixinOrderItem.voteorbal);
    // console.log(this.selectedBalancesheetSubTitleID);
    // console.log(this.selectedBalancesheetSubTitleName);
}

async getAllGnDivisionsForSabha()  {
  this.httpProvider.getAllGnDivisionsForSabha(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAllGnDivionsListForOffice = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAllGnDivionsListForOffice = [];
          }
      }}
    });
}

async getAllVoteAssignmentDetailsForOffice() {
  this.httpProvider.getAllVoteAssignmentDetailsForOfficeId(localStorage.getItem('CurrentOfficeId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAllCustomVotesListForOffice = resultData;
        // console.log(this.APIAllCustomVotesListForOffice);
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAllCustomVotesListForOffice = [];
          }
      }}
    });
}


async getAllBalancesheetTitles() {
  this.httpProvider.getAllBalancesheetTitle(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAllBalanceSheetTitle = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAllBalanceSheetTitle = [];
          }
      }}
    });
}

async getAllBalancesheetSubtitle(titleid:any) {
  this.httpProvider.getAllBalancesheetSubtitleByTitleID(titleid).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIAllBalanceSheetSubTitle = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIAllBalanceSheetSubTitle = [];
          }
      }}
    });
}
  
async updateCustomer() {

  if (this.selectedCustomer.mobileNumber == null || this.selectedCustomer.mobileNumber=="") {
    this.isValid=false; Notify.warning('Mobile Number is Required.');
  } 
  else if (this.selectedCustomer.name == null || this.selectedCustomer.name==""){
    this.isValid=false; Notify.warning('Customer Name is Required.');
  } 
  else{this.isValid=true;}

  if (this.isValid==true) {
    this.selectedCustomer.sabhaId=Number(localStorage.getItem('sabhaId'));
    this.selectedCustomer.createdBy=Number(localStorage.getItem('Currentuserid'));
    this.selectedCustomer.updatedBy=Number(localStorage.getItem('Currentuserid'));
    this.selectedCustomer.isEditable=1;
    // console.log(this.selectedCustomer);
  this.httpProvider.savePartner(this.selectedCustomer)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Customer Saved successfully..!');
    },
    error: error => {
       Notify.failure('Error Occured..!');
    }
});
setTimeout(() => {
this.selectedCustomer = new Partner();
this.refresh();
}, 2000);
}
}

async GetCustomerPhone() {
  this.spinner.show();
  this.getPartnerByPhoneNo(this.selectedCustomer.mobileNumber);
  this.getSession();
  this.spinner.hide();
}

async GetCustomerNIC() {
  this.spinner.show();
  this.getPartnerByNIC(this.selectedCustomer.nicNumber);
  this.getSession();
  this.spinner.hide();
}

newcustomer=false;
async getPartnerByNIC(nic:any) {
  this.httpProvider.getPartnerByNIC(nic).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.selectedCustomer = resultData;
        this.newcustomer=false;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.newcustomer=true;
            // this.APIAllPartnersList = [];
          }
      }}
    });
}

async getPartnerByPhoneNo(phoneNo:any) {
  this.httpProvider.getPartnerByPhoneNo(phoneNo).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.selectedCustomer = resultData;
        this.newcustomer=false;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            // this.APIAllPartnersList = [];
            this.newcustomer=true;
          }
      }}
    });
}

clearCustomer() {
  this.selectedCustomer = new Partner();
  this.selectedCustomer.gnDivisionId=0;
}

clearOrderItem() {
      this.selectedVoteAssignmentDetail=[];
      this.TitleID=0;
      this.selectedBalancesheetSubTitle=0;
      this.newMixinOrderItem={};

      this.SelectedVoteName="";
      this.SelectedVoteId=0;

      this.newMixinOrderItem.mixinVoteAssignmentDetailId=0;
      this.newMixinOrderItem.amount="";
      this.newMixinOrderItem.totalAmount="";
      this.newMixinOrderItem.paymentVatAmount=0.00;
      this.newMixinOrderItem.paymentNbtAmount=0.00;
      this.newMixinOrderItem.paymentNbtAmount=0.00;
      this.newMixinOrderItem.stampAmount=0.00;
      
      this.vatChecked=false;
      this.nbtChecked=false;
      this.stampChecked=false;
}

async getAllVoteAssignmentsForOffice() {
  this.APIVoteAssignmentsForOfficeList=[];
  this.APICustomVoteNamesForOfficeList =[];
  this.httpProvider.getAllVoteAssignmentsForOfficeId(localStorage.getItem('CurrentOfficeId')).subscribe({
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

async getVatPercentage() {
  this.httpProvider.getPaymentVatsById(1).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVatPercentage = Number(resultData.amountPercentage);
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVatPercentage = 0.00;
          }
      }}
    });
}

async getNbtPercentage() {
  this.httpProvider.getPaymentNbtsById(1).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APINbtPercentage = Number(resultData.amountPercentage);
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APINbtPercentage = 0.00;
          }
      }}
    });
}

onchangeNbtCheck(value:any) {
  this.nbtChecked = !value;
  this.calculateTotalAmount();
}

onchangeVatCheck(value:any) {
  this.vatChecked = !value;
  this.calculateTotalAmount();
}

onchangeStampCheck(value:any) {
  this.stampChecked = !value;
  this.calculateTotalAmount();
}

onchangePaymentOption(event:any) {
  this.mixinOrder.paymentMethodId=event.value;
  this.mixinOrder.chequeNumber="";
  // this.mixinOrder.chequeDate=new Date('1900-01-01');
  this.mixinOrder.chequeBankName="";
}

calculateTotalAmount()
{
  let amount:number=0.00;
  let nbtamount:number=0.00;
  let vatamount:number=0.00;
  let stampamount:number=0.00;
  let totalAmount:number=0.00;
  
  this.newMixinOrderItem.totalAmount=0.00;
  this.newMixinOrderItem.paymentVatAmount=0.00;
  this.newMixinOrderItem.paymentNbtAmount=0.00;
  this.newMixinOrderItem.paymentNbtAmount=0.00;

  if(Number(this.newMixinOrderItem.amount)>0)
  {
    amount=this.newMixinOrderItem.amount;
  }
  
  if(this.vatChecked)
  {
    vatamount=(amount*Number(this.APIVatPercentage))/100;
    this.newMixinOrderItem.paymentVatAmount=vatamount;
  }
  if(this.nbtChecked)
  {
    nbtamount=(amount*Number(this.APINbtPercentage))/100;
    this.newMixinOrderItem.paymentNbtAmount=nbtamount;
  }
  if(this.stampChecked)
  {
    stampamount=this.newMixinOrderItem.stampAmount;
    this.newMixinOrderItem.paymentVatAmount=vatamount;
  }
  // else{
  //   this.newMixinOrderItem.stampAmount=0.00;
  // }
  if(this.stampChecked==true && this.newMixinOrderItem.stampAmount !="" && Number(this.newMixinOrderItem.stampAmount)>0)
  {
    stampamount=Number(this.newMixinOrderItem.stampAmount);
    this.newMixinOrderItem.stampAmount=stampamount;
  }
  totalAmount=Number(amount)+Number(vatamount)+Number(nbtamount)+Number(stampamount);
  this.newMixinOrderItem.totalAmount=totalAmount;
}

amountInputHandle(event:any) {
  var amount = event.target.value;
  this.calculateTotalAmount();
}

stampInputHandle(event:any) {
  var stamp = event.target.value;
  this.calculateTotalAmount();
}

async saveMixinOrder() {
  if (this.currentSession.id == 0 ) {
    this.isValid=false; Notify.warning('Please Create a Session First..!');
  }
  else if (this.selectedCustomer.id == 0 || this.selectedCustomer.id==undefined) {
    this.isValid=false; Notify.warning('Please Select a Customer');
  } 
  else if (this.mixinOrderItems.length == 0){
    this.isValid=false; Notify.warning('Please add Order Items.');
  } 
  else if (this.mixinOrder.paymentMethodId==0 || this.mixinOrder.paymentMethodId==undefined || this.mixinOrder.paymentMethodId==null){
    this.isValid=false; Notify.warning('Please Select a Payment Method');
  } 
  else if(this.mixinOrder.paymentMethodId==2 && (this.mixinOrder.chequeDate==undefined || this.mixinOrder.chequeNumber==undefined || this.mixinOrder.chequeBankName==undefined))
    {
      this.isValid=false; Notify.warning('Please complete all the fields of cheque information.');
    }
    else if(this.mixinOrder.paymentMethodId==2 && this.mixinOrder.chequeNumber=="")
    {
      this.isValid=false; Notify.warning('Please Enter Cheque Number.');
    }
   else if(this.mixinOrder.paymentMethodId==2 && this.mixinOrder.chequeBankName=="")
    {
      this.isValid=false; Notify.warning('Please Enter Cheque Issued Bank.');
    }

  else{this.isValid=true;}
    // let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    // var unixtimestamp = (new Date(currentDateTime!.replace('-','/'))).getTime() / 1000;
    this.mixinOrder.id="0";
    // this.mixinOrder.code=localStorage.getItem('CurrentOfficeId')+String(unixtimestamp);
    this.mixinOrder.code="";
    this.mixinOrder.state=1;
    this.mixinOrder.partnerId=Number(this.selectedCustomer.id);
    this.mixinOrder.customerName=this.selectedCustomer.name;
    this.mixinOrder.customerNicNumber=String(this.selectedCustomer.nicNumber);
    this.mixinOrder.customerMobileNumber=String(this.selectedCustomer.mobileNumber);
    // this.mixinOrder.gnDivisionId=Number(this.selectedCustomer.gnDivisionId);
    let totalamount:number = 0;
    this.mixinOrderItems.forEach((item:any) => {
      totalamount=Number(totalamount)+Number(item.totalAmount);
    });
    
    this.mixinOrder.totalAmount=totalamount;

    const customdate  = this.datepipe.transform(this.mixinOrder.chequeDate, 'yyyy-MM-dd');
    this.mixinOrder.chequeDate = new Date(customdate!);

    // this.mixinOrder.totalAmount: number;
    // this.mixinOrder.chequeNumber?: string;
    // this.mixinOrder.chequeDate?: Date;
    // this.mixinOrder.chequeBankName?: string;
    // this.mixinOrder.createdAt? : Date;
    // this.mixinOrder.updatedAt?: Date;
    // this.mixinOrder.paymentMethodId: number;
    
    this.mixinOrder.cashierId=0;
    this.mixinOrder.createdBy=Number(localStorage.getItem('Currentuserid'));
    this.mixinOrder.officeId=Number(localStorage.getItem('CurrentOfficeId'));
    this.mixinOrder.sessionId=this.currentSession.id;
    // this.mixinOrder.mixinCancelOrder=[];

    this.mixinOrder.mixinOrderLine = [];
    this.mixinOrderItems.forEach((item:any) => {
      this.mixinOrder.mixinOrderLine.push(item);
    });
    // console.log('Item List to save :' + this.mixinOrderItems);
    // console.log('Order Line to save :' + this.mixinOrder.mixinOrderLine);
    // this.mixinOrder.mixinOrderLine=this.mixinOrderItems;
  if(this.isValid){
  // this.spinner.show();
  // this.clicked = true;
    // console.log(this.mixinOrder);

    if(this.submitButtonClickCount==1)
    {
    this.submitButtonClickCount=this.submitButtonClickCount+1;
    console.log(this.mixinOrder);
    this.httpProvider.saveMixinOrderDetail(this.mixinOrder)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         localStorage.setItem('lastreceiptcode',resultData.code);
         Notify.success('Order Saved successfully..!');
         this.submitButtonClickCount=1;
         this.showDialog();
    },
    error: error => {
       Notify.failure('Error Occured..!');
    }
});
    }
    else{
      Notify.success('Please Wait, Allready Sent the Save Request..!');
    }
// this.clicked = false;
// this.spinner.hide();
setTimeout(() => {
this.mixinOrder = new MixinOrder();
this._router.navigateByUrl('/mixinorderlist');
this.refresh();
this.getSession();
}, 2000);
}
}
    
    open() {
        this.dayPicker.api.open();
    }
     
    close() {
         this.dayPicker.api.close();
    } 

    showDialog(){
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        height: '270px'
      }); 
      setTimeout(() => {
        dialogRef.close();
      }, 100000);
    }


}
