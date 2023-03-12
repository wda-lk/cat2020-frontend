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
import { DomSanitizer } from '@angular/platform-browser';
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
  selector: 'app-reportviewer',
  templateUrl: './reportviewer.component.html',
  styleUrls: ['./reportviewer.component.scss']
})

export class ReportViewerComponent implements OnInit {
  @ViewChild('pdfViewer') public pdfViewer:any;
  dateTo = dayjs();
  dateFrom : any;
  pdfurl = '';
  reportfile : any;

  selectedofficeId:any;
  selectedOrderStatus :any=1;

  APIOfficesList : any;

  APIReportResponse : any;

  loading = false;

  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;

  // pdfSrc: string | ArrayBuffer = '';
  
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

  ExportToExcel() {
    if(this.selectedDate!=null)
    {
      let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
      let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/XLSX/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
      this.downloadFile(reportAPI).subscribe(
          (res:any) => {
            console.log(res);
          const downloadLink = document.createElement('a');
          downloadLink.target = '_self';
          const fileName = "Sarap_Receipts_"+this.selectedDate+".xlsx";
          const data = window.URL.createObjectURL(res);
          downloadLink.href = data;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          }
      );
    }
  }

  ExportToPdf() {
    if(this.selectedDate!=null)
    {
      let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
    let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/pdf/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
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

  Print() {
        if(this.selectedDate!=null)
        {
          let selecteddateformatted = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
        let reportAPI = apiUrl+"/api/Report/getMixinSarapReceiptsDailyReport/pdf/"+ localStorage.getItem('CurrentOfficeId') +"/"+selecteddateformatted;
        this.downloadFile(reportAPI).subscribe(
            (res:any) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = window.URL.createObjectURL(res);
            document.body.appendChild(iframe);
            iframe.contentWindow?.print();
            }
        );
      }
  }


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

}
