import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http : HttpClient) { }

  getModels(data) {
    return this.http.post(environment.apiBaseUrl, data);
  }

  storeModel(data) {
    return this.http.post(environment.apiBaseUrl, data);
  }

  deleteModel(data) {
    return this.http.post(environment.apiBaseUrl, data);
  }
}
