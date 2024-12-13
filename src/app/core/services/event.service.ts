import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  reloadNotification = new BehaviorSubject<any>(null);


  constructor() { }

  actionReloadNotification(role: string) {
    this.reloadNotification.next(role);
  }
}
