import {  Component,  Input,  ChangeDetectionStrategy,  Output,  ElementRef,  
  EventEmitter,  OnChanges,  SimpleChanges,  OnInit,  OnDestroy,
  ViewChild,
  AfterViewChecked,
  NgZone, Inject, Injectable
} from '@angular/core';
import { HttpProviderService } from '../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { saveAs} from "file-saver";
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DOCUMENT } from '@angular/common';
import { DpDatePickerModule } from 'ng2-date-picker';
import * as dayjs from 'dayjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as _moment from 'moment';
const moment = _moment; 
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MixinOrder } from '../mix-income-management/models/MixinOrder';
import { mixinColor } from '@angular/material/core';
import { Session } from '../common/models/Session';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

var apiUrl = environment.apiUrl;
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
@Component({
  selector: 'app-sarapdailyreceiptsvotewisereport',
  templateUrl: './sarapdailyreceiptsvotewisereport.component.html',
  styleUrls: ['./sarapdailyreceiptsvotewisereport.component.scss']
})

export class SarapDailyReceiptsVoteWiseReportComponent implements OnInit {
  @ViewChild('pdfViewer') public pdfViewer:any;
  dateTo = dayjs();
  dateFrom : any;
  pdfurl = '';
  reportfile : any;
  officename:any;
  selectedofficeId:any;
  selectedOrderStatus :any=1;

  selectedsession : Session = new Session();

  @Input()
  doc: any;
  reportpreview: SafeResourceUrl;

  // doc:any="https://cat2020.lk/birt/frameset?__report=sarapdailyreportforoffice.rptdesign&__format=pdf&office=%E0%B6%85%E0%B6%B8%E0%B7%8A%E0%B6%B8%E0%B7%8F&date=2022-2-22";
  viewer = 'google';
  selectedType = 'docx'; //'docx';
  // doc = 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx';
  // doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';

  APIOfficesList : any;

  APIReportResponse : any;

  loading = false;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  // pdfSrc: string | ArrayBuffer = '';
  
  postedmixinorders : MixinOrder[];
  canceledmixinorders : MixinOrder[];
  
  pdfSrc:any;
  selectedDate:any;

  APIPDF:any;
  constructor(@Inject(DOCUMENT) private document: any, private datepipe: DatePipe,private httpProvider: HttpProviderService, private fb: FormBuilder,private _router: Router,private sanitizer: DomSanitizer,  private http: HttpClient) {
    this.dateFrom = dayjs('10.30.2021');
  }
  isadmin:boolean=false;
  ngOnInit() {
    this.checkPermission("RPTSARAPDAILY", Number(localStorage.getItem('Currentuserid')));
    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}
    
    
    this.officename=localStorage.getItem('CurrentSabhaName');
  }


  async getSessionByOfficeModuleAndDate(officeid:number,module:any, date:any) {
    this.httpProvider.getSessionByOfficeModuleAndDate(officeid,module,date).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.selectedsession = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.selectedsession=new Session();
            }
        }}
      });
  }


reportdate:String;
 LoadReport(date:any)
 {
  if(date!=null)
    {
  let selecteddateformatted = this.datepipe.transform(date, 'yyyy-MM-dd');
  this.reportdate=String(selecteddateformatted);
  let officeid=Number(localStorage.getItem('CurrentOfficeId'));
  let officename=localStorage.getItem('CurrentSabhaName') + " - " + localStorage.getItem('CurrentOfficeName');
  this.getSessionByOfficeModuleAndDate(officeid,'MIX',selecteddateformatted);
  setTimeout(() => {
  //console.log(this.selectedsession);
  if(this.isSinhala)
  this.doc='https://cat2020.lk/birt/output?__report=LG03_S.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'&officename='+officename+'';
  
  if(this.isTamil)
  //this.doc='https://cat2020.lk/birt/output?__report=sarapdailyreportforoffice_tml.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'&officename='+officename+'';
  this.doc='https://cat2020.lk/birt/output?__report=LG03_T.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'&officename='+officename+'';

  // this.doc='https://cat2020.lk/birt/frameset?__report=sarapdailyreportforoffice.rptdesign&__format=pdf&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'';
  //console.log(this.doc);
  // this.mypreview= this.sanitizer.bypassSecurityTrustResourceUrl(this.doc);

  window.open(this.doc, "_blank"); 
  // this.reportpreview= this.sanitizer.bypassSecurityTrustHtml(
  //   '<iframe width="100%" height="800" allowTransparency="true" frameborder="0" src='+this.doc+'></iframe>',
  // );

  // let winUrl:any = URL.createObjectURL(new Blob([this.doc], { type: 'text/html' }));
  // window.open(this.doc);
  }, 2000);

  // this.getAllCancelledMixinOrders(selecteddateformatted);
  // this.getAllPostedMixinOrders(selecteddateformatted);
}
else{
  Notify.failure("Please select a date first.");
}
 }

  haspermission :Boolean =true;


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
  datePickerConfig = {
    format: 'YYYY-MM-DD HH:mm',
    monthFormat: 'MMM, YYYY',
    startDate: '01.01.2012',
  }
  validatorsChanged() {
    console.log('Change date');
  }

  PrintInvoice(invoiceno: any) {
    this.httpProvider.getMixinSarapReceiptsDailyReport('pdf', 118).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  PreviewReport() {
    // if(this.selectedDate!=null)
    // {
     let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
    // let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/pdf/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
    let reportAPI = apiUrl+"/api/Report/sarapReceiptsDailyReport";
    this.downloadFile(reportAPI).subscribe(
        (res:any) => {
          console.log(res);
            this.pdfSrc = window.URL.createObjectURL(res); // pdfSrc can be Blob or Uint8Array
        }
    );
  // }
  }

  ExportToExcel(date:any) {
    if(date!=null)
    {
      let selecteddateformatted = this.datepipe.transform(date, 'yyyy-MM-dd');
  this.reportdate=String(selecteddateformatted);
  let officeid=Number(localStorage.getItem('CurrentOfficeId'));
  let officename=localStorage.getItem('CurrentSabhaName') + " - " + localStorage.getItem('CurrentOfficeName');
  this.getSessionByOfficeModuleAndDate(officeid,'MIX',selecteddateformatted);

      setTimeout(() => {
        if(this.isSinhala)
        this.doc='https://cat2020.lk/birt/output?__report=LG03_S.rptdesign&__format=xls&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'&officename='+officename+'';
        
        if(this.isTamil)
        this.doc='https://cat2020.lk/birt/output?__report=LG03_T.rptdesign&__format=xls&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'&officename='+officename+'';

        // this.doc='https://cat2020.lk/birt/output?__report=sarapdailyreportforoffice_tml.rptdesign&__format=xls&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'&officename='+officename+'';
        
          const downloadLink = document.createElement('a');
          downloadLink.target = '_self';
          const fileName = "Sarap_Receipts_"+date+".xlsx";
          downloadLink.href = this.doc;
          downloadLink.download = fileName;
          downloadLink.click();
        }, 2000);

      // let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
      // let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/XLSX/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
      // this.downloadFile(reportAPI).subscribe(
      //     (res:any) => {
      //       console.log(res);
      //     const downloadLink = document.createElement('a');
      //     downloadLink.target = '_self';
      //     const fileName = "Sarap_Receipts_"+this.selectedDate+".xlsx";
      //     const data = window.URL.createObjectURL(res);
      //     downloadLink.href = data;
      //     downloadLink.download = fileName;
      //     document.body.appendChild(downloadLink);
      //     downloadLink.click();
      //     }
      // );
    }
    else{
      Notify.failure("Please select a date first.");
    }
  }

  Print(date:any) {
    if(date!=null)
    {
      let selecteddateformatted = this.datepipe.transform(date, 'yyyy-MM-dd');
  this.reportdate=String(selecteddateformatted);
  let officeid=Number(localStorage.getItem('CurrentOfficeId'));
  this.getSessionByOfficeModuleAndDate(officeid,'MIX',selecteddateformatted);
  this.doc='https://cat2020.lk/birt/output?__report=sarapdailyreportforoffice.rptdesign&__format=html&__svg=true&__locale=en_US&__timezone=IST&__masterpage=true&__rtl=false&__cubememsize=10&&__pageoverflow=0&__overwrite=false&officeid='+officeid+'&sessionid='+this.selectedsession.id+'&date='+selecteddateformatted+'';
// window.open(this.doc,'_blank')?.print();

// var printdata = this.docRef.nativeElement.outerHTML;

setTimeout(() => {
var tab = window.open('') as Window;
tab.document.open();
tab.document.write(this.doc.nativeElement.innerHTMLext);
setTimeout(() => {
    tab.stop();
    tab.print();
    tab.close();
}, 300);
}, 2000);
// var getPrint:any = window.open(this.doc, '_blank');
// setTimeout(getPrint.print(), 3000);



      // setTimeout(() => {
      //       const iframe = document.createElement('iframe');
      //       iframe.style.display = 'none';
      //       iframe.src = this.doc;
      //       document.body.appendChild(iframe);
      //       iframe.contentWindow?.print();

      //   }, 2000);

      // let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
      // let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/XLSX/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
      // this.downloadFile(reportAPI).subscribe(
      //     (res:any) => {
      //       console.log(res);
      //     const downloadLink = document.createElement('a');
      //     downloadLink.target = '_self';
      //     const fileName = "Sarap_Receipts_"+this.selectedDate+".xlsx";
      //     const data = window.URL.createObjectURL(res);
      //     downloadLink.href = data;
      //     downloadLink.download = fileName;
      //     document.body.appendChild(downloadLink);
      //     downloadLink.click();
      //     }
      // );
    }
    else{
      Notify.failure("Please select a date first.");
    }
  }

  ExportToPdf() {
    if(this.selectedDate!=null)
    {
      let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
    let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/pdf/"+ localStorage.getItem('CurrentOfficeName') +"/"+selecteddateformatted;
    this.downloadFile(reportAPI).subscribe(
        (res:any) => {
          console.log(res);
        const downloadLink = document.createElement('a');
        downloadLink.target = '_self';
        const fileName = "Sarap_Receipts_"+this.selectedDate+".pdf";
        const data = window.URL.createObjectURL(res);
        downloadLink.href = data;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        }
    );
  }
  }

  ExportToWord() {
    if(this.selectedDate!=null)
    {
      let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
    let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/DOCX/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
    this.downloadFile(reportAPI).subscribe(
        (res:any) => {
        this.APIReportResponse = res;
        const downloadLink = document.createElement('a');
        downloadLink.target = '_self';
        const fileName = "Sarap_Receipts_"+this.selectedDate+".doc";
        const data = window.URL.createObjectURL(res);
        downloadLink.href = data;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        }
    );
  }
  }

  // Print() {
  //       if(this.selectedDate!=null)
  //       {
  //         let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
  //       let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/pdf/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
  //       this.downloadFile(reportAPI).subscribe(
  //           (res:any) => {
  //           const iframe = document.createElement('iframe');
  //           iframe.style.display = 'none';
  //           iframe.src = window.URL.createObjectURL(res);
  //           document.body.appendChild(iframe);
  //           iframe.contentWindow?.print();
  //           }
  //       );
  //     }
  // }


  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((result: any) => {
                return result;
            })
        );
  }
  
async getMixinSarapReceiptsDailyReport() {
  this.httpProvider.getMixinSarapReceiptsDailyReport('pdf',118).subscribe({
    next: (data) => {
      console.log(data.body);
      const blob = new Blob([data.body], {
        type: 'application/octet-stream'
    });
    this.pdfSrc = window.URL.createObjectURL(blob);
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            // this.APIGeneratedReport = null;
          }
      }}
    });
}

async getAllPostedMixinOrders(date:any) { //this includes orders with the both state post and cancel disappoved
  this.httpProvider.getAllMixinOrdersForOfficeAndStateAndDate(localStorage.getItem('CurrentOfficeId'),3,date).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      this.postedmixinorders = resultData;
      console.log(this.postedmixinorders);
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.postedmixinorders = [];
          }
      }}
    });
}

async getAllCancelledMixinOrders(date:any) {
  this.httpProvider.getAllMixinOrdersForOfficeAndStateAndDate(localStorage.getItem('CurrentOfficeId'),5,date).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      this.canceledmixinorders = resultData;
      console.log(this.canceledmixinorders);
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.canceledmixinorders = [];
          }
      }}
    });
}

getMixinPostedOrderTotals(method:any){
  var total = 0;
let pm :Number;
if(method=="C")
{
  pm=1;
}
if(method=="Q")
{
  pm=2;
}
if(method=="X")
{
  pm=3;
}
if(method=="D")
{
  pm=4;
}
if(method=="T")
{
  pm=4;
}


this.postedmixinorders!.forEach((item) => {
  if(method=="T")
  {
    total += item.totalAmount;
  }
  else
  {
  if(item.paymentMethodId==pm)
    total += Number(item.totalAmount) || 0
  }
});
return total;
}

getMixinCanceledOrderTotals(method:any){
  var total = 0;
let pm :Number;
if(method=="C")
{
  pm=1;
}
if(method=="Q")
{
  pm=2;
}
if(method=="X")
{
  pm=3;
}
if(method=="D")
{
  pm=4;
}
if(method=="T")
{
  pm=4;
}


this.canceledmixinorders!.forEach((item) => {
  if(method=="T")
  {
    total += item.totalAmount;
  }
  else
  {
  if(item.paymentMethodId==pm)
    total += Number(item.totalAmount) || 0
  }
});
return total;
}
}
