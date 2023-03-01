import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { Pagination } from '../../common/models/pagination.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VoteDetail } from '../models/VoteDetail';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-votedetail',
  templateUrl: './votedetail.component.html',
  styleUrls: ['./votedetail.component.scss']
})
export class VotedetailComponent implements OnInit {
  selectedVoteDetail: VoteDetail = new VoteDetail();
  loading = false;

  displayedColumns: string[] = ['id', 'voteCode', 'voteName', 'voteOrder','actions'];
  dataSource = new MatTableDataSource<VoteDetail>([]);
  paginator: MatPaginator;
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
     this.paginator = paginator;
     this.dataSource.paginator = this.paginator;
   }
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };
  @Output() paginated = new EventEmitter<PageEvent>();
  p: number = 1;
  
  isSubmitted: boolean = false;
  isValid : boolean;
  hasErrors : number;
  // ProgrammeID:any;
  objProgramme:any;
  objProject:any;
  objSubProject:any;
  objIncomeTitle:any;
  objIncomeSubTitle:any;
  VoteCode :any;

  APIVoteDetailsList:any;
  APIVoteDetailsForProgrammeList:any;
  APIProgrammesList :any;
  APIProjectsList :any;
  APIProjectsListByProgramme :any;
  APISubProjectsByProject :any;
  APIIncomeTitleListByProgramme :any;
  APIIncomeSubTitleListByTitle :any;
  
  SelectedLanguage : any;
  isSinhala :boolean;
  isTamil :boolean;
  isEnglish :boolean;
  
  constructor(private httpProvider: HttpProviderService) {
  }
  isadmin:boolean=false;
  ngOnInit() {
    this.checkPermission("VTDETAILSADDEDIT", Number(localStorage.getItem('Currentuserid')));
    if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}
    this.refresh();
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


  async refresh() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}

    this.loading = true;
    this.isValid = false;
    this.getAllProgrammes();
    //this.getAllVoteDetailsByProgrammeId(26);
    this.loading = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getAllProgrammes() {
    this.httpProvider.getAllProgramme(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIProgrammesList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.APIProgrammesList = [];
            }
        }}
      });
  }

  async getAllProjects() {
    this.httpProvider.getAllProject(localStorage.getItem('sabhaId')).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.APIProjectsList = resultData;
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.APIProjectsList = [];
            }
        }}
      });
  }

async getAllVoteDetails() {
  this.httpProvider.getAllVoteDetails(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteDetailsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteDetailsList = [];
          }
      }}
    });
}

async getAllVoteDetailsForProgrammeId(id : any) {
  this.APIVoteDetailsForProgrammeList=[];
  this.dataSource=new MatTableDataSource<VoteDetail>([]);
  this.httpProvider.getAllVoteDetailsForProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteDetailsForProgrammeList = resultData;
        this.dataSource.data=resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteDetailsForProgrammeList = [];
          }
      }}
    });
}

async LoadProjectsandIncomeTitles(id : any) {
  this.objProgramme=null;
  this.objProgramme = this.APIProgrammesList.find((obj:any) => obj.id == id);
  this.VoteCode =localStorage.getItem('sabhaCode')+ "-"+ this.objProgramme.code;
  this.selectedVoteDetail.code=this.VoteCode;
  this.getAllProjectsByProgrammeId(id);
  this.getAllIncomeTitlesByProgrammeId(id);
  
  //to load the table when selecting programmes drop down only
  this.getAllVoteDetailsForProgrammeId(id);
}

async getAllProjectsByProgrammeId(id : any) {
  this.httpProvider.getAllProjectsForProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIProjectsListByProgramme = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIProjectsListByProgramme = [];
          }
      }}
    });
}

async getAllSubProjectsByProjectId(id : any) {
  this.objProject=null;
  this.objProject = this.APIProjectsListByProgramme.find((obj:any) => obj.id == id);
  this.VoteCode = localStorage.getItem('sabhaCode')+ "-"+ this.objProgramme.code+ "-"+ this.objProject.code;
  this.selectedVoteDetail.code=this.VoteCode;
  this.httpProvider.getAllsubprojectforprojectID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APISubProjectsByProject = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APISubProjectsByProject = [];
          }
      }}
    });
}

onchangeSubproject(id : any)
{
  this.objSubProject=null;
  this.objSubProject = this.APISubProjectsByProject.find((obj:any) => obj.id == id);
  this.VoteCode = localStorage.getItem('sabhaCode')+ "-"+ this.objProgramme.code+ "-"+ this.objProject.code+ "-"+ this.objSubProject.code;
  this.selectedVoteDetail.code=this.VoteCode;
}
onchangeSubTitle(id : any)
{

  this.objIncomeSubTitle=null;
  this.objIncomeSubTitle = this.APIIncomeSubTitleListByTitle.find((obj:any) => obj.id == id);
  if(this.objProject!=null && this.objProject.id>0 )
  {
  this.VoteCode = localStorage.getItem('sabhaCode')+ "-"+ this.objProgramme.code+ "-"+ this.objProject.code+ "-"+ this.objSubProject.code+ "-"+ this.objIncomeSubTitle.code;
  }
  else{
    this.VoteCode = localStorage.getItem('sabhaCode')+ "-"+ this.objProgramme.code+ "-"+ this.objIncomeSubTitle.code;
  }
  this.selectedVoteDetail.code=this.VoteCode;
}

async getAllIncomeTitlesByProgrammeId(id : any) {
  this.httpProvider.getAllIncometitleByProgrammeId(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeTitleListByProgramme = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeTitleListByProgramme = [];
          }
      }}
    });
}

async getAllIncomeSubTitlesByIncomeTitleID(id : any) {
  this.objIncomeTitle=null;
  this.objIncomeTitle = this.APIIncomeTitleListByProgramme.find((obj:any) => obj.id == id);
  this.httpProvider.getAllIncomeSubtitlebyTitleID(id).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIIncomeSubTitleListByTitle = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIIncomeSubTitleListByTitle = [];
          }
      }}
    });
}



  async updateRecord() {
    this.hasErrors=0;
    if (this.selectedVoteDetail.programmeID == null){
      this.isValid=false; Notify.warning('Please select a Programme.');
    } else{this.isValid=true;}

    // if (this.selectedVoteDetail.projectID == null){
    //   this.isValid=false; Notify.warning('Please select a Project.');
    // } else{this.isValid=true;}


    // if (this.selectedVoteDetail.subprojectID == null){
    //   this.isValid=false; Notify.warning('Please select a Sub Project.');
    // } else{this.isValid=true;}


    if (this.selectedVoteDetail.incomeTitleID == null){
      this.hasErrors+1;
      this.isValid=false; Notify.warning('Please select a Income Title.');
    } 
    else{
      this.isValid=true;
    }

    if (this.selectedVoteDetail.incomeSubtitleID == null){
      this.isValid=false; Notify.warning('Please select a Income Subtitle.');
    } else{
      this.isValid=true;
    }

    if (this.selectedVoteDetail.nameEnglish == null && this.isEnglish==true){
      this.isValid=false; Notify.warning('Name English is Required.');
    } else{
      this.isValid=true;
    }

    if (this.selectedVoteDetail.nameSinhala == null && this.isSinhala==true) {
      this.isValid=false; Notify.warning('Name Sinhala is Required.');
    } else{
      this.isValid=true;
    }

    if (this.selectedVoteDetail.nameTamil == null && this.isTamil==true){
    this.isValid=false; Notify.warning('Name Tamil is Required.');
    } else{
      this.isValid=true;
    }

    if (this.selectedVoteDetail.code == null){
      this.isValid=false; Notify.warning('Code is Required.');
    } else{this.isValid=true;
    }

    if (this.isValid==true ) {
    if (this.selectedVoteDetail.id !== undefined) {
    this.httpProvider.updateVoteDetails(this.selectedVoteDetail)
    .subscribe({
      next: (result) => {
           var resultData = result.body;
           Notify.success('Income Vote Detail Updated successfully..!');
      },
      error: error => {
         Notify.failure('Error Occured..!');
      }
  });
}
else {
      if (this.isSinhala==true && this.selectedVoteDetail.nameEnglish == null) {
        this.selectedVoteDetail.nameEnglish="-";
      } 
      if (this.isSinhala==true && this.selectedVoteDetail.nameTamil == null) {
        this.selectedVoteDetail.nameTamil="-";
      } 
   

      if (this.isTamil==true && this.selectedVoteDetail.nameSinhala == null) {
        this.selectedVoteDetail.nameSinhala="-";
      } 
      if (this.isTamil==true && this.selectedVoteDetail.nameEnglish == null) {
        this.selectedVoteDetail.nameEnglish="-";
      } 

      if (this.isEnglish==true && this.selectedVoteDetail.nameSinhala == null) {
        this.selectedVoteDetail.nameSinhala="-";
      } 
      if (this.isTamil==true && this.selectedVoteDetail.nameTamil == null) {
        this.selectedVoteDetail.nameTamil="-";
      } 

      this.selectedVoteDetail.sabhaID = Number(localStorage.getItem('sabhaId'));
      this.selectedVoteDetail.status = 1;
      this.selectedVoteDetail.incomeOrExpense = 1;
      this.selectedVoteDetail.sabhaCode = String(localStorage.getItem('sabhaCode'));

      this.selectedVoteDetail.programmeNameSinhala = this.objProgramme.nameSinhala;
      this.selectedVoteDetail.programmeNameSinhala = this.objProgramme.nameSinhala;
      this.selectedVoteDetail.programmeNameEnglish = this.objProgramme.nameEnglish;
      this.selectedVoteDetail.programmeNameTamil = this.objProgramme.nameTamil;
      this.selectedVoteDetail.programmeCode = this.objProgramme.code;

      if(this.objProject!=null && this.objProject.id>0){
      this.selectedVoteDetail.projectCode = this.objProject.code;
      this.selectedVoteDetail.projectNameSinhala = this.objProject.nameSinhala;
      this.selectedVoteDetail.projectNameEnglish = this.objProject.nameEnglish;
      this.selectedVoteDetail.projectNameTamil = this.objProject.nameTamil;
      
      this.selectedVoteDetail.subprojectCode = this.objSubProject.code;
      this.selectedVoteDetail.subprojectNameSinhala = this.objSubProject.nameSinhala;
      this.selectedVoteDetail.subprojectNameEnglish = this.objSubProject.nameEnglish;
      this.selectedVoteDetail.subprojectNameTamil = this.objSubProject.nameTamil;
      }
      else
      {        
        this.selectedVoteDetail.projectID = 0;
        this.selectedVoteDetail.projectCode = "-";
        this.selectedVoteDetail.projectNameSinhala = "-"
        this.selectedVoteDetail.projectNameEnglish = "-";
        this.selectedVoteDetail.projectNameTamil = "-";
        
        this.selectedVoteDetail.subprojectID = 0;
        this.selectedVoteDetail.subprojectCode = "-";
        this.selectedVoteDetail.subprojectNameSinhala = "-";
        this.selectedVoteDetail.subprojectNameEnglish = "-";
        this.selectedVoteDetail.subprojectNameTamil = "-";
        }

        if(this.objIncomeTitle!=null && this.objIncomeTitle.id>0){
      this.selectedVoteDetail.incomeTitleNameSinhala = this.objIncomeTitle.nameSinhala;
      this.selectedVoteDetail.incomeTitleNameEnglish = this.objIncomeTitle.nameEnglish;
      this.selectedVoteDetail.incomeTitleNameTamil = this.objIncomeTitle.nameTamil;
      this.selectedVoteDetail.incomeTitleCode = this.objIncomeTitle.code;
        
      this.selectedVoteDetail.incomeSubtitleNameSinhala = this.objIncomeSubTitle.nameSinhala;
      this.selectedVoteDetail.incomeSubtitleNameEnglish = this.objIncomeSubTitle.nameEnglish;
      this.selectedVoteDetail.incomeSubtitleNameTamil = this.objIncomeSubTitle.nameTamil;
      this.selectedVoteDetail.incomeSubtitleCode = this.objIncomeSubTitle.code;
        }
  this.httpProvider.saveVoteDetails(this.selectedVoteDetail)
  .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Income Title Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
}
setTimeout(() => {
  this.selectedVoteDetail = new VoteDetail();
  this.selectedVoteDetail.programmeID=this.objProgramme.id;
  this.getAllVoteDetailsForProgrammeId(this.objProgramme.id);
// this.refresh();
}, 1000);
}
}

  clearRecord() {
    this.selectedVoteDetail = new VoteDetail();
  }

  async deleteVoteDetail(voteDetail: VoteDetail) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${voteDetail.code}. This cannot be undone.`)) {
      this.httpProvider.deleteVoteDetailsById(voteDetail.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             setTimeout(() => {this.refresh();}, 2000);
             Notify.success('VoteDetail Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {
      this.selectedVoteDetail = new VoteDetail();
      this.selectedVoteDetail.programmeID=this.objProgramme.id;
      this.getAllVoteDetailsForProgrammeId(this.objProgramme.id);
      // this.refresh();
      }, 1000);
  }
}

editVoteDetail(voteDetail: VoteDetail) {
  this.selectedVoteDetail = voteDetail;
}

}


