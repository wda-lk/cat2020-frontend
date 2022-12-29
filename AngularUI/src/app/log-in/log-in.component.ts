import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, map } from 'rxjs/operators';
import { AlertService, AuthenticationService } from 'app/auth/services';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css','../../assets/css/main.css']
})

export class LogInComponent  implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    token : any;

    _valid: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private http: HttpClient,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    submit() {
        //this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
        this._valid = true;
        // let _obj = {
        //     username: this.loginForm.get('username').value,
        //     password: this.loginForm.get('password').value
        //       }


             

            // this.authenticationService.login(_obj).subscribe(
            //     response => {
            //         let x = response;
            //     }
            // )

       

        // this.http.post<any>('http://54.249.159.219/api/auth/login',_obj).subscribe(
        //     data=>{

        //         if (data.token) { // need to improve security
        //             localStorage.setItem('CurrentSabhaNm', data.sabhaName);
        //             localStorage.setItem('sabhaId', data.sabhaId);
        //             localStorage.setItem('CurrentUserNm', data.username);
        //             localStorage.setItem('CurrentDistrictNm', data.districtName);
        //             localStorage.setItem('CurrentProvinceNm', data.provinceName);
        //             localStorage.setItem('CurrentLogopathNm', data.sabhaLogoPath);
        //             localStorage.setItem('Current', data.sabhaLogoPath);
        //             //console.log(localStorage.getItem('sabhaId'));
        //             this.router.navigate(['/dashboard']);
        //         }
        //     }
        // )
        // setTimeout(()=>{                           // <<<---using ()=> syntax
        //     this._valid = false;
        // }, 500);
        
  }


        //this.router.navigate(['/dashboard'])


        // this.submitted = true;
        // if (this.loginForm.invalid) {
        //     return;
        // }

        // this.loading = true;
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        // });
   //}
}
