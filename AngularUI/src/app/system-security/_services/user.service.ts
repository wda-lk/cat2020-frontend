import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { SystemUser } from '../_models';

@Injectable({ providedIn: 'root' })
export class SystemUserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<SystemUser[]>(`${environment.apiUrl}/users`);
    }
}