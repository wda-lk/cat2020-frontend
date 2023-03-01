import { Injectable,Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../../system-security/_services';
import { HttpProviderService } from '../../services/http-provider.service';

@Injectable({ providedIn: 'any' })
export class PermissionService {
    constructor(private router: Router, private http: HttpClient, private component: Component,private httpProvider: HttpProviderService,private authenticationService: AuthenticationService) { }

    haspermissionforuserrule:boolean;
    
    hasPermission(component:any) : boolean{
        console.log('component' + component);
        if (this.authenticationService.userValue!=null) { 
            if(component.data.permission!=='' || component.data.permission!==null || component.data.permission!==undefined)
            {
                return true;
            }
            else{
                this.checkPermission(component.data.permission,Number(localStorage.getItem('Currentuserid')));
                return this.haspermissionforuserrule;
            }
        }
        else{
            return false;
        }
    }

    async checkPermission(ruleCode:any,userId:Number) {
        this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
          next: (data) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData) {
              this.haspermissionforuserrule = resultData;
              console.log('resultdata :'+resultData);
              console.log('this.haspermissionforuserrule :'+this.haspermissionforuserrule);
            }
          }
        },
        error: error => {
              if (error.status == 404) {
                if(error.error && error.error.message){
                //   Notify.failure(error.error.message);
                  // this.APIAllPartnersList = [];
                }
            }}
          });
      }


}