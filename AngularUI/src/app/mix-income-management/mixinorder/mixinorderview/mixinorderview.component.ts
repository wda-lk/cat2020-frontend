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
import { Observable, of, Subscription, ReplaySubject, Subject } from 'rxjs';
import { tap, finalize, startWith, debounceTime, switchMap, map, filter, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Office } from 'src/app/common/models/Office';
import { UserDetail } from 'src/app/user-management/models/UserDetail';
import { RouterLink } from '@angular/router';
import {  Router, ActivatedRoute } from '@angular/router';

import { ToWords } from 'to-words';


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

  constructor(private httpProvider: HttpProviderService, private _router: Router, private _Activatedroute: ActivatedRoute, private fb: FormBuilder) {
    
  }
  isadmin:boolean=false;
  ngOnInit() {
    this.checkPermission("MXORDERPRINTVIEW", Number(localStorage.getItem('Currentuserid')));
    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}

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
  inwords(amount:any)
  {
   return this.toWords.convert(Number(amount));
  }

async getMixinOrderById(id:any) {
  this.httpProvider.getMixinOrderById(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        // this.mixinOrder = resultData;
        this.mixinOrderCustomOBJ = resultData;
        // console.log(this.mixinOrderCustomOBJ);
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

async print(mixinOrder:any){

this.paidMixinOrder(mixinOrder)
// window.print();

}


async paidMixinOrder(mixinOrder: any) {
  if (confirm(`Are you sure you want to cancel the Mixin Order ${mixinOrder.code}. This cannot be undone.`)) {
    this.httpProvider.paidMixinOrder(mixinOrder.id,Number(localStorage.getItem('Currentuserid')))
    .subscribe({
      next: (data) => {
           var resultData = data.body;
           console.log(data.body);
      },
      error: error => {
        console.log(error);
      }
  });
  setTimeout(() => {
    //this.clearRecord() ;
    window.print();
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
