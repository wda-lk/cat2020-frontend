import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        console.log(username);
        return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { username, password })
            .pipe(map(user => {
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (user.token) { // need to improve security
                    console.log(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('Currentuserid', user.userid);
                    localStorage.setItem('CurrentUserNm', user.username);
                    localStorage.setItem('CurrentToken', user.token);
                    localStorage.setItem('CurrentSessionExp', user.expiration);
                    localStorage.setItem('CurrentUserNamewithinitials', user.namewithinitials);
                    localStorage.setItem('sabhaId', user.sabhaId);
                    localStorage.setItem('sabhaCode', user.sabhaCode);
                    localStorage.setItem('CurrentLogopathNm', user.sabhaLogoPath);
                    localStorage.setItem('CurrentOfficeId', user.officeID);
                    localStorage.setItem('CurrentSabhaNm', user.sabhaName);
                    localStorage.setItem('CurrentDistrictNm', user.districtName);
                    localStorage.setItem('CurrentProvinceNm', user.provinceName);
                    localStorage.setItem('CurrentSabhaLanId', user.languageid);
                    localStorage.setItem('CurrentSabhaLang', user.language);
                    // this.router.navigate(['/dashboard']);
                    this.userSubject.next(user);
                    return user;
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');

        sessionStorage.removeItem('id');

                    localStorage.removeItem('user');
                    localStorage.removeItem('Currentuserid');
                    localStorage.removeItem('CurrentUserNm');
                    localStorage.removeItem('CurrentToken');
                    localStorage.removeItem('CurrentSessionExp');
                    localStorage.removeItem('CurrentUserNamewithinitials');
                    localStorage.removeItem('SabhaID');
                    localStorage.removeItem('CurrentLogopathNm');
                    localStorage.removeItem('CurrentOfficeId');
                    localStorage.removeItem('CurrentSabhaNm');
                    localStorage.removeItem('CurrentDistrictNm');
                    localStorage.removeItem('CurrentProvinceNm');
                    localStorage.removeItem('CurrentSabhaLanId');
                    localStorage.removeItem('CurrentSabhaLang');
                    localStorage.removeItem('sabhaId');

        localStorage.clear();
        sessionStorage.clear();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}