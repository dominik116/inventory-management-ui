import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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
}
