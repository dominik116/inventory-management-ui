import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(public override readonly http: HttpClient) {
    super(http);
  }

  authLogin(params: any) {
      return this.post('/auth/login', params);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDecodeToken(){
    const token: any = localStorage.getItem('token');
    const userDecoded: any = jwtDecode(token);
    return userDecoded;
  }

  getRoles(): Observable<any>{
    const role = this.getDecodeToken()?.jti;
    return of(role);
  }
}
