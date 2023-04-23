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
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserCommentDialogComponent } from './usercommentdialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxPrinterService } from "ngx-printer";

@Component({
  selector: 'app-mixinorderview',
  templateUrl: './mixinorderview.component.html',
  styleUrls: ['./mixinorderview.component.scss']
})


export class MixinOrderViewComponent implements OnInit {
  doc: any;
  reportpreview: SafeResourceUrl;
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
  showReciept:boolean=false;

  // mixinOrderItems: MixinOrderLine[] = new Array();
  mixinOrder : MixinOrder = new MixinOrder();
  mixinCancelOrder : MixinCancelOrder = new MixinCancelOrder();
  mixinOrderCustomOBJ : any;
  hidePage = false;

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

  constructor(private httpProvider: HttpProviderService, private _router: Router, private _Activatedroute: ActivatedRoute, private fb: FormBuilder,private sanitizer: DomSanitizer,private spinner: NgxSpinnerService,public dialog: MatDialog,private printerService: NgxPrinterService) {
    
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

  ngAfterViewInit() {
    this.printerService.$printWindowOpen.subscribe(opened => {
      this.hidePage = opened;
      console.log(this.hidePage);
    });
  }

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

    this.LoadReport(this.orderID);
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


printPage() {
  const css = `
    // @page {
    //   margin: 0;
    //   size: 21.0cm 29.7cm;

    // }
    @page
   {
    size: 11.7in 8.3in;
    size: Portrait
    ;
  }
  `;

  const head = document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  style.media = "print";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);

  this.printerService.printDiv("printDiv");
}

LoadReport(orderid:Number)
 {
  if(this.isSinhala)
  // this.doc='https://cat2020.lk/birt/output?__report=mixinorderreceipt_sin.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&__emitterid=org.eclipse.birt.report.engine.emitter.html&695874038&orderid='+orderid+'';
  this.doc='https://cat2020.lk/birt/output?__report=mixinorderreceipt_sin.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&orderid='+orderid+'';
  
  if(this.isTamil)
  // this.doc='https://cat2020.lk/birt/output?__report=mixinorderreceipt_sin.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&__emitterid=org.eclipse.birt.report.engine.emitter.html&695874038&orderid='+orderid+'';
  this.doc='https://cat2020.lk/birt/output?__report=mixinorderreceipt_tml.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&orderid='+orderid+'';

  this.reportpreview= this.sanitizer.bypassSecurityTrustHtml(
    // '<iframe width="790" height="490" align="left|right|middle|top|bottom" allowTransparency="true" frameborder="0" scrolling="auto" src='+this.doc+'></iframe>',
    '<iframe  class="" align="left|right|middle|top|bottom" style="width: 11in; height: 11in;position: relative; border: 1px solid white;" allowTransparency="true" frameborder="0" src='+this.doc+'></iframe>',
  );
  // window.open(this.doc, "_blank"); 
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
  this.printPage();
  // window.print();
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
  this.LoadReport(this.orderID);
  this.getMixinOrderById(this.orderID);
  setTimeout(() => {
  // window.print();
  this.printPage();
}, 6000);
}, 2000);
}
}

usercomment:any="";

async approveCancelMixinOrder(mixinOrder: any) {
  // if (confirm(`Are you sure you want to Approve the cancellation of Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
  // this.spinner.show();
  mixinOrder.mixinCancelOrder.updatedAt=new Date;
  mixinOrder.mixinCancelOrder.approvedBy=Number(localStorage.getItem('Currentuserid'));
  mixinOrder.mixinCancelOrder.ApprovalComment=this.usercomment;
  this.mixinCancelOrder.mixinOrderId=Number(mixinOrder.id);
    this.httpProvider.approveCancelMixinOrder(mixinOrder.mixinCancelOrder)
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
    this._router.navigateByUrl('/mixinordercancelaproval');
    }, 1000);
}

async disapproveCancelMixinOrder(mixinOrder: any) {
  mixinOrder.mixinCancelOrder.updatedAt=new Date;
  mixinOrder.mixinCancelOrder.approvedBy=Number(localStorage.getItem('Currentuserid'));
  mixinOrder.mixinCancelOrder.ApprovalComment=this.usercomment;
  this.mixinCancelOrder.mixinOrderId=Number(mixinOrder.id);
    this.httpProvider.disapproveCancelMixinOrder(mixinOrder.mixinCancelOrder)
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
    this._router.navigateByUrl('/mixinordercancelaproval');
    }, 1000);
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


cancelMixinOrder(mixinOrder: MixinOrder) {
  if(this.usercomment!="")
  {
  this.mixinCancelOrder=new MixinCancelOrder();
  this.mixinCancelOrder.id="0";
  this.mixinCancelOrder.reason=this.usercomment;
  this.mixinCancelOrder.createdAt=new Date;
  this.mixinCancelOrder.createdBy=Number(localStorage.getItem('Currentuserid'));
  this.mixinCancelOrder.sessionId=mixinOrder.sessionId;
  this.mixinCancelOrder.mixinOrderId=Number(mixinOrder.id);
  console.log(this.mixinCancelOrder);
    this.httpProvider.cancelMixinOrder(this.mixinCancelOrder)
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
    this._router.navigateByUrl('/mixinorderlist');
    }, 1000);
  // }
}
}

getUserNameWithInitials(id:any)
{
  console.log();

// console.log(this.selectedUser);
// return user.nameWithInitials;
// return this.selectedUser.nameWithInitials;
}

name: string;

cancelOrderDialog(mixinOrder: MixinOrder): void {
  if (confirm(`Are you sure you want to cancel the Mixin Order ${mixinOrder.code}. This will send for approval. `)) {
  let dialogRef = this.dialog.open(UserCommentDialogComponent, {
    width: '300px',
    data: { name: this.name, usercomment: this.usercomment }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.usercomment = result;
    this.cancelMixinOrder(mixinOrder);
  });
}
}

cancelOrderApproveDialog(mixinOrder: MixinOrder): void {
  if (confirm(`Are you sure you want to Approve the Mixin Order ${mixinOrder.code}.`)) {
  let dialogRef = this.dialog.open(UserCommentDialogComponent, {
    width: '300px',
    data: { name: this.name, usercomment: this.usercomment }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.usercomment = result;
    this.approveCancelMixinOrder(mixinOrder);
  });
}
}

cancelOrderDisapproveDialog(mixinOrder: MixinOrder): void {
  if (confirm(`Are you sure you want to diasaprove the Mixin Order ${mixinOrder.code}.`)) {
  let dialogRef = this.dialog.open(UserCommentDialogComponent, {
    width: '300px',
    data: { name: this.name, usercomment: this.usercomment }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.usercomment = result;
    this.disapproveCancelMixinOrder(mixinOrder);
  });
}
}

}
