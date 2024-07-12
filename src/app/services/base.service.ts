import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url = 'http://localhost:8080/inventory-management';

  httpOptions: any = {
    headers: new HttpHeaders()
  };

  constructor(public readonly http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type',
       'application/json; charset=utf-8'
      )
   }

   get(path: string) {
    return this.http.get(`${this.url}${path}`, this.httpOptions);
   }

   getPaginated(path: string, params: any) {
    let localParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null) {
        localParams = localParams.append(key, value as any);
      }
    })
    return this.http.get(`${this.url}${path}`, {
      headers: this.httpOptions.headers,
      params: localParams
    });
   }

   post(path: string, params = {}) {
    return this.http.post(`${this.url}${path}`, params, this.httpOptions);
   }
}
