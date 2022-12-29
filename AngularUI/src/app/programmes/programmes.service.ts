import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Programme } from '../models/programme';

const baseUrl = 'http://54.249.159.219';

@Injectable({
  providedIn: 'root'
})
export class ProgrammesService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {

    // const result = this.http.request(method, url, {
    //   body: data,
    //   responseType: responseType || 'json',
    //   observe: 'body',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    // return new Promise<any>((resolve, reject) => {
    //   result.subscribe(resolve as any, reject as any);
    // });
  }

  getProgrammes() {
    return this.request('get', `${baseUrl}/api/vote/programmes/getAllProgrammesForSabhaId/${localStorage.getItem('sabhaId')}`);
  }

  getProgramme(id: string) {
    return this.request('get', `${baseUrl}/api/vote/programmes/getProgrammeById/${id}`);
  }

  createProgramme(programme: Programme) {
    console.log('createProgramme ' + JSON.stringify(programme));
    return this.request('post', `${baseUrl}/api/vote/programmes/saveProgramme`, programme);
  }

  updateProgramme(programme: Programme) {
    console.log('updateProgramme ' + JSON.stringify(programme));
    return this.request('post', `${baseUrl}/api/vote/programmes/updateProgramme`, programme);
    // return this.request('post', `${baseUrl}/api/vote/programmes/updateProgramme2/${programme.id}`, programme);
  }

  deleteProgramme(id: string) {
    return this.request('delete', `${baseUrl}/api/vote/programmes/deleteProgramme/${id}`, null, 'text');
  }
}
