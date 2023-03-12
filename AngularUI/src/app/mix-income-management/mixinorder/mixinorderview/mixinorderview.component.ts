import { Component, Injectable, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { VoteAssignment } from '../../models/VoteAssignment';
import { Partner } from '../../../common/models/Partner';
import { MixinOrder } from '../../models/MixinOrder';
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
import { Observable, of, interval, Subscription, ReplaySubject, Subject } from 'rxjs';
import { tap, finalize, startWith, debounceTime, switchMap, map, filter, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Office } from 'src/app/common/models/Office';
import { UserDetail } from 'src/app/user-management/models/UserDetail';
import { RouterLink } from '@angular/router';
import {  Router, ActivatedRoute } from '@angular/router';
import { NgxBarcode6Component } from 'ngx-barcode6';
import { ToWords } from 'to-words';
import { NgxSpinnerService } from "ngx-spinner";
import { MixinCancelOrder } from '../../models/MixinCancelOrder';

@Component({
  selector: 'app-mixinorderview',
  templateUrl: './mixinorderview.component.html',
  styleUrls: ['./mixinorderview.component.scss']
})


export class MixinOrderViewComponent implements OnInit {

  orderID:any=0;
  sub:any;
  logopath:any;
  sabhaName:any;
  totalVAT:Number=0;
  totalNBT:Number=0;
  totalStamp:Number=0;
  selectedUser:any;
  currentUserNamewithInitials:any;
  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;
  
  // mixinOrderItems: MixinOrderLine[] = new Array();
  mixinOrder : MixinOrder = new MixinOrder();
  mixinOrderCustomOBJ : any;

  toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: { // can be used to override defaults for the selected locale
        name: 'Rupee',
        plural: 'Rupees',
        symbol: 'Rs.',
        fractionalUnit: {
          name: 'Cent',
          plural: 'Cents',
          symbol: '',
        },
      }
    }
  });

  constructor(private httpProvider: HttpProviderService, private _router: Router, private _Activatedroute: ActivatedRoute, private fb: FormBuilder,private spinner: NgxSpinnerService) {
    
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


  isadmin:boolean=false;

  ngOnInit() {
    // this.spinner.show();
    this.checkPermission("MXORDERVIEW", Number(localStorage.getItem('Currentuserid')));
    this.checkCashierPermission("CASHIER", Number(localStorage.getItem('Currentuserid')));
    this.checkCancelApprovePermission("MXORDERCANCELAPROVAL", Number(localStorage.getItem('Currentuserid')));
    this.checkAddEditPermission("MXORDERADDEDIT", Number(localStorage.getItem('Currentuserid')));

    // if(Number(localStorage.getItem('IsAdmin'))==1)
    // {this.isadmin=true;}

    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    this.logopath = localStorage.getItem('CurrentLogopathNm');
    this.sabhaName = localStorage.getItem('CurrentSabhaName');
    this.currentUserNamewithInitials = localStorage.getItem('CurrentUserNamewithinitials');
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.orderID = params.get('orderid');
    });

    this.getMixinOrderById(this.orderID);
    // this.spinner.hide();
  }

  haspermission :Boolean;
  hascashierpermission :Boolean;
  hascancelapprovepermission :Boolean;
  hasaddeditpermission :Boolean;

  async checkPermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.haspermission = Boolean(data.body);
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
            }
        }}
      });
  }

  async checkCashierPermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.hascashierpermission = Boolean(data.body);
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
            }
        }}
      });
  }

  async checkCancelApprovePermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.hascancelapprovepermission = Boolean(data.body);
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
            }
        }}
      });
  }

  async checkAddEditPermission(ruleCode:any,userId:Number) {
    this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
      next: (data) => {
          this.hasaddeditpermission = Boolean(data.body);
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
            }
        }}
      });
  }

  inwords(amount:any)
  {
   return this.toWords.convert(Number(amount));
  }

async getMixinOrderById(id:any) {
  this.httpProvider.getMixinOrderByIdAndOffice(id,localStorage.getItem('CurrentOfficeId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        // this.mixinOrder = resultData;
        this.mixinOrderCustomOBJ = resultData;
        this.bcValue=this.mixinOrderCustomOBJ.code;
        //  console.log(this.mixinOrderCustomOBJ);
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            // this.APIAllPartnersList = [];
          }
      }}
    });
}

getTotalVAT(): number {
  let sum = 0;
  for (let i = 0; i < this.mixinOrderCustomOBJ?.mixinOrderLine.length; i++) {
    sum += Number(this.mixinOrderCustomOBJ?.mixinOrderLine[i].paymentVatAmount)
  }
  return sum;
}

getTotalNBT(): number {
  let sum = 0;
  for (let i = 0; i < this.mixinOrderCustomOBJ?.mixinOrderLine.length; i++) {
    sum += Number(this.mixinOrderCustomOBJ?.mixinOrderLine[i].paymentNbtAmount)
  }
  return sum;
}

getTotalStamp(): number {
  let sum = 0;
  for (let i = 0; i < this.mixinOrderCustomOBJ?.mixinOrderLine.length; i++) {
    sum += Number(this.mixinOrderCustomOBJ?.mixinOrderLine[i].stampAmount)
  }
  return sum;
}

 duplicateprint(mixinOrder:any){
  window.print();
  }

async print(mixinOrder:any){

this.paidMixinOrder(mixinOrder)
// window.print();

}


async paidMixinOrder(mixinOrder: any) {
  if (confirm(`Are you sure you want to Confirm payment and print the Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
    this.httpProvider.paidMixinOrder(mixinOrder.id,Number(localStorage.getItem('Currentuserid')))
    .subscribe({
      next: (data) => {
           var resultData = data.body;
          //  console.log(data.body);
      },
      error: error => {
        // console.log(error);
      }
  });
  setTimeout(() => {
  this.getMixinOrderById(this.orderID);
}, 1000);
  setTimeout(() => {
    //this.clearRecord() ;
    window.print();
    }, 3000);
}
}


async approveCancelMixinOrder(mixinOrder: any) {
  if (confirm(`Are you sure you want to Approve the cancellation of Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
  this.spinner.show();
    this.httpProvider.approveCancelMixinOrder(mixinOrder.id,Number(localStorage.getItem('Currentuserid')))
    .subscribe({
      next: (data) => {
           var resultData = data.body;
          //  console.log(data.body);
      },
      error: error => {
        // console.log(error);
      }
  });
  setTimeout(() => {
    //this.clearRecord() ;
    this.spinner.hide();
    this._router.navigateByUrl('/mixinorderlist');
    }, 1000);
}
}
async disapproveCancelMixinOrder(mixinOrder: any) {
  if (confirm(`Are you sure you want to Disapprove the cancellation of Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
  this.spinner.show();
    this.httpProvider.disapproveCancelMixinOrder(mixinOrder.id,Number(localStorage.getItem('Currentuserid')))
    .subscribe({
      next: (data) => {
           var resultData = data.body;
           console.log(data.body);
      },
      error: error => {
        // console.log(error);
      }
  });
  setTimeout(() => {
    //this.clearRecord() ;
    this.spinner.hide();
    this._router.navigateByUrl('/mixinorderlist');
    }, 1000);
}
}

async deleteOrder(mixinOrder: any) {
  if (confirm(`Are you sure you want to delete the Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
  this.spinner.show();
    this.httpProvider.deleteMixinOrder(mixinOrder.id,Number(localStorage.getItem('Currentuserid')))
    .subscribe({
      next: (data) => {
           var resultData = data.body;
          //  console.log(data.body);
      },
      error: error => {
        // console.log(error);
      }
  });
  setTimeout(() => {
    //this.clearRecord() ;
    this.spinner.hide();
    this._router.navigateByUrl('/mixinorderlist');
    }, 1000);
}
}

async cancelMixinOrder(mixinOrder: MixinOrder) {
  if (confirm(`Are you sure you want to cancel the Mixin Order ${mixinOrder.code}. This will send for approval. `)) {
  this.spinner.show();
  mixinOrder.mixinCancelOrder=new MixinCancelOrder();
  mixinOrder.mixinCancelOrder.id="0";
  mixinOrder.mixinCancelOrder.reason="Reason1";
  mixinOrder.mixinCancelOrder.createdAt=new Date;
  mixinOrder.mixinCancelOrder.updatedAt=new Date;
  mixinOrder.mixinCancelOrder.createdBy=Number(localStorage.getItem('Currentuserid'));
  mixinOrder.mixinCancelOrder.sessionId=mixinOrder.sessionId;
  mixinOrder.mixinCancelOrder.mixinOrderId=Number(mixinOrder.id);
  mixinOrder.mixinCancelOrder.approvedBy=0;
  mixinOrder.mixinCancelOrder.ApprovalComment="ApprovalComment1";
  console.log(mixinOrder.mixinCancelOrder);
    this.httpProvider.cancelMixinOrder(mixinOrder.mixinCancelOrder)
    .subscribe({
      next: (data) => {
           var resultData = data.body;
          //  console.log(data.body);
      },
      error: error => {
        // console.log(error);
      }
  });
  setTimeout(() => {
    //this.clearRecord() ;
    this.spinner.hide();
    this._router.navigateByUrl('/mixinorderlist');
    }, 1000);
}
}

getUserNameWithInitials(id:any)
{
  console.log();

// console.log(this.selectedUser);
// return user.nameWithInitials;
// return this.selectedUser.nameWithInitials;
}


}
