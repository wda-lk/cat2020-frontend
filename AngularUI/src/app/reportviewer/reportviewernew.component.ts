import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'pdf-viewer-app',
  templateUrl: './reportviewernew.component.html',
  styleUrls: ['./reportviewernew.component.scss']
})
  
export class ReportViewerNewComponent implements OnInit {
  // pdfSrc: string | PDFSource | ArrayBuffer = './assets/pdf-test.pdf';
  pdfSrc: string | ArrayBuffer = '';

  error: any;
  page:any = 1;
  rotation = 0;
  zoom = 1.0;
  zoomScale = 'page-width';
  originalSize = false;
  pdf: any;
  renderText = true;
  isLoaded = false;
  stickToPage = false;
  showAll = true;
  autoresize = true;
  fitToPage = false;
  outline: any[];
  isOutlineShown = false;
  pdfQuery = '';
  mobile = false;

  constructor( private http: HttpClient) {

  }

  
  ngOnInit() {
    if (window.screen.width <= 768) {
      this.mobile = true;
    }

    // let url = "http://localhost:5000/api/Report/GetMyPdf";
    let url = "http://localhost:5000/api/Report/getMixinSarapReceiptsDailyReport/pdf/118";
this.downloadFile(url).subscribe(
    (res:any) => {
      console.log(res);
        this.pdfSrc = window.URL.createObjectURL(res); // pdfSrc can be Blob or Uint8Array

        // this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
    }
);

  }

  haspermission :Boolean;

  // async checkPermission(ruleCode:any,userId:Number) {
  //   this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
  //     next: (data) => {
  //         this.haspermission = Boolean(data.body);
  //         console.log('haspermission : '+this.haspermission);
  //   },
  //   error: error => {
  //         if (error.status == 404) {
  //           if(error.error && error.error.message){
  //           }
  //       }}
  //     });
  // }
  

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((result: any) => {
                return result;
            })
        );
  }

  // Load pdf
  loadPdf() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/pdf-test.pdf', true);
    xhr.responseType = 'blob';

    xhr.onload = (e: any) => {
      console.log(xhr);
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: 'application/pdf' });
        this.pdfSrc = URL.createObjectURL(blob);
      }
    };

    xhr.send();
  }

  /**
   * Set custom path to pdf worker
   */
  setCustomWorkerPath() {
    (window as any).pdfWorkerSrc = '/lib/pdfjs-dist/build/pdf.worker.js';
  }

  incrementPage(amount: number) {
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  rotate(angle: number) {
    this.rotation += angle;
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    const $pdf: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }


  /**
   * Get outline
   */
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }



  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param e custom event
   */
  pageRendered(e: any) {
    let newe: CustomEvent=e;
    console.log('(page-rendered)', newe);
  }

  /**
   * Page initialized callback.
   *
   * @param {CustomEvent} e
   */
  pageInitialized(e: any) {
    let newe: CustomEvent = e;
    console.log('(page-initialized)', newe);
  }

  /**
   * Page change callback, which is called when a page is changed (called multiple times)
   *
   * @param e number
   */
  pageChange(e: any) {
    let newe: number = e;
    console.log('(page-change)', newe);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.mobile = event.target.innerWidth <= 768;
  }
}
