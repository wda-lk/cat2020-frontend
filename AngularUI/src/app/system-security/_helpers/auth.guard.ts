import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../../app/system-security/_services';
import { Observable, throwError, of } from 'rxjs';
import { HttpProviderService } from '../../services/http-provider.service';
import { switchMap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private httpProvider: HttpProviderService
    ) { }

    haspermissionforuserrule:any;
    public hasAccess:boolean;

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        if (user) {
            // let userid :number = Number(user.userid);
            // if(next.data['rules']!=undefined){
            //     let rules :any =next.data['rules'];
            //     let ruleCode :string = rules[0];
            //     this.authenticationService.hasPermission(ruleCode,userid).subscribe(data=>{
            //               });


            //     this.hasAccess=Boolean(localStorage.getItem('hasPermission'));
            //         console.log(this.hasAccess);

            //     if(this.hasAccess==true)
            //     {
            //         console.log('if true'+this.hasAccess);
            //         return true;
            //     }
            //     else{
            //         this.router.navigate(['/accessdenied'], { queryParams: { returnUrl: state.url } });
            //         console.log('if fasle '+this.hasAccess);
            //         return false;
            //     }
            // }
            // else{
            return true;
        }
        // }
        else{
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    }

    //    async checkAccess(ruleCode:any,userId:Number) {
    //     this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).subscribe({
    //         next: (data) => {
    //         console.log(data.body);
    //             this.hasAccess = data.body;
    //       },
    //       error: error => {
    //         if (error.status == 404) {
    //           if(error.error && error.error.message){
    //             console.log(error.error.message);
    //           //   Notify.failure(error.error.message);
    //             // this.APIAllPartnersList = [];
    //           }
    //       }
    //   }
    //     });
    // }


    checkAccess(ruleCode:any,userId:Number):Observable<boolean>{

        return this.httpProvider.getCheckAccessByRuleCode(ruleCode,userId).pipe(
          switchMap((response) =>{
            // do something with icons response
            // based on some condition return true or false
            return of(true)
          })
        )
      }


}

