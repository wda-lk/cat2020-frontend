import { Component, OnInit, ViewChild, ChangeDetectionStrategy, EventEmitter,  Input,  Output, } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
@Component({
  selector: 'app-accessdenied',
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.scss']
})

export class AccessDeniedComponent implements OnInit {

  constructor(private httpProvider: HttpProviderService, private fb: FormBuilder,private _router: Router) {
  
  }

  ngOnInit() {

  }

}
