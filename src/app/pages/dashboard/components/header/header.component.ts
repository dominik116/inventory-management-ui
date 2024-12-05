import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ModalAddNotificationComponent } from 'src/app/shared/modal-add-notification/modal-add-notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: any;
  countNotifications: number = 0;

  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: NgbModal,
    private readonly notificationsService: NotificationService
  ) { 
    this.user = this.authService.getDecodeToken();
    this.loadCountNotifications();
  }

  loadCountNotifications(){
    this.notificationsService.getCountNotificationByUser(this.user.sub).subscribe((data: any)=>{
      this.countNotifications = data;
    });
  }

  navigateToProfile() {
    this.router.navigateByUrl('inventory-management/profile/'+this.user.sub);
  }

  createNewNotification() {
    const modal = this.modalService.open(ModalAddNotificationComponent, {
      backdrop: true,
      centered: true,
      size: 'md'
    })

    modal.result.then((result: any) => {
      const response: any = result;
      this.notificationsService.addNotification(this.user.sub, response).subscribe({
        next: (data: any) => {
          this.loadCountNotifications();
          alert('The notification has been created successfully with ID ' +data.id + '.');
        },
        error: (err: any) => {
          alert(err.error?.detail);
        }
      })
    }, () => {})
  }

  navigateViewNotifications(){
    this.router.navigateByUrl('inventory-management/notifications/'+this.user.sub);
  }
  
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
