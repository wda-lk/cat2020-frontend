import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './model';
import { Router } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
        private router: Router,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // public login(credential: any): Observable<any> {
    //     //console.log(data);
    
    //     return this.http.post('http://54.249.159.219/api/auth/login', credential ).pipe(
    //       map((response: any) => {
    //         return response;
    //       }),
    //       catchError((error) => {
    //         return throwError(error);
    //       })
    //     );
    //   }


    // login(username: string, password: string) {
    //     return this.http.post<any>(`/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //                 this.currentUserSubject.next(user);
    //             }

    //             return user;
    //         }));
    // }

    // login(username: string, password: string) {

    //     let _obj = {
    //         username: username,
    //         password: password
    //          }

    //     return this.http.post<any>('http://54.249.159.219/api/auth/login', _obj)
    //         .pipe(map(user => {
                
    //             if (user.token) {
                   
    //                 this.router.navigate(['/dashboard']);
    //             }

    //             return user;
    //         }));
    //  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }


}