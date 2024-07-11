import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  httpOptions: any = {
    headers: new HttpHeaders()
  };

  constructor(public readonly http: HttpClient) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type',
       'application/json; charset=utf-8'
      )
   }

   get(path: string, url: string = 'http://localhost:8080/inventory-management') {
    return this.http.get(`${url}${path}`, this.httpOptions);
   }

   getPaginated(path: string, params: any, url: string = 'http://localhost:8080/inventory-management') {
    let localParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null) {
        localParams = localParams.append(key, value as any);
      }
    })
    return this.http.get(`${url}${path}`, {
      headers: this.httpOptions.headers,
      params: localParams
    });
   }
}
