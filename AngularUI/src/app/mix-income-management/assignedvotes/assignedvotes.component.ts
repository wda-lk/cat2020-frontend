import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { VoteAssignment } from '../models/VoteAssignment';
import { VoteAssignmentFullDataClass } from '../models/VoteAssignment';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from '../../common/models/pagination.model';
import { PageEvent } from '@angular/material/paginator';

// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
@Component({
  selector: 'app-assignedvotes',
  templateUrl: './assignedvotes.component.html',
  styleUrls: ['./assignedvotes.component.scss']
})

export class AssignedVotesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'voteCode', 'voteName', 'accountNo','officeName'];
  dataSource = new MatTableDataSource<VoteAssignment>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10, total: 0 };

  @Output() paginated = new EventEmitter<PageEvent>();

  p: number = 1;

  APIVoteAssignmentsList: any;
 
  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllOfficeGroupedForVoteAssignment();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

async getAllOfficeGroupedForVoteAssignment() {
  this.httpProvider.getAllOfficeGroupedForVoteAssignment(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIVoteAssignmentsList = resultData;
        this.dataSource.data=resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIVoteAssignmentsList =[];
          }
      }}
    });
}

}
