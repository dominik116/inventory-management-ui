import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService{

  constructor(public override readonly http: HttpClient) {
    super(http)
   }

   addNotification(username: string, params: any) {
    return this.post(`/notifications/${username}`, params);
  }

  getNotificationsByUsername(username: string, params: any) {
    const newParams = {
      username: username,
      ...params
    }
    return this.getPaginated(`/notifications`, newParams);
  }
  
  getCountNotificationByUser(username: string){
    return this.get(`/notifications/count/${username}`);
  }

  updateNotification(username: string, params: any){
    return this.put(`/notifications/${username}/message`, params);
  }
}
