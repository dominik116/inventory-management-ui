import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/core/services/utils.service';
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
  rol: string = 'user';

  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: NgbModal,
    private readonly notificationsService: NotificationService,
    private readonly utilsService: UtilsService
  ) { 
    this.user = this.authService.getDecodeToken();
    this.authService.getRoles().subscribe((role) => {
      this.rol = role;
      this.loadCountNotifications();
    })
  }

  loadCountNotifications() {
    const service = this.rol === 'admin' ? this.getCountNotification() : this.getCountNotificationByUser();
    service.subscribe((data: any) => {
      this.countNotifications = data;
    });
  }

  getCountNotificationByUser() {
    return this.notificationsService.getCountNotificationByUser(this.user.sub);
  }

  getCountNotification() {
    return this.notificationsService.getCountNotification();
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
          this.utilsService.showSuccess('The notification has been created successfully with ID ' +data.id + '.');
        },
        error: (err: any) => {
          this.utilsService.showDanger(err?.error?.detail);
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
