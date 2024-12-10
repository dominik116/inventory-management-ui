import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ModalAddNotificationComponent } from 'src/app/shared/modal-add-notification/modal-add-notification.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  user: any;
  notifications: any = null;
  SIZE_PAGE = 10;
  pageNumber: number = 1;
  pagination : any;
  loading = true;
  rol: string = 'user';

  constructor(private readonly route: ActivatedRoute,
    private readonly notificationsService: NotificationService,
    private readonly modalService: NgbModal,
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService
  ) {
    this.route.params.subscribe((data: any) => {
      this.user = data.id;
      this.pagination = this.getPagination();
      this.authService.getRoles().subscribe((role) => {
        this.rol = role;
        this.loadNotification();
      })
    })
   }

   loadNotification() {
    this.loading = true;
    const service = this.rol === 'admin' ? this.getAllNotifications() : this.getNotificationsByUser();
    service.subscribe({
      next: (data: any) => {
        this.notifications = data?.content || null;
        this.pagination.page = data.page;
        this.pagination.size = data.size;
        this.pagination.total = data.total;
        this.mapData();
        this.loading = false;
      },
      error: (err: any) => {
        this.utilsService.showDanger(err?.error?.detail);
        this.loading = false;
      }
    })
   }

  getAllNotifications() {
    return this.notificationsService.getAllNotifications('', this.pagination);
  }
  
  getNotificationsByUser() {
    return this.notificationsService.getNotificationsByUsername(this.user, this.pagination);
  }


  mapData(){
    if(this.notifications?.length > 0) {
      this.notifications.forEach((el: any, index: number) => {
        el.idLocal = index + 1;
      })
    }
  }

  getPagination() {
    return {
      page: 0,
      size: this.SIZE_PAGE
    }
  }

  pageChange(page: number) {
    this.pagination.page = page - 1;
    this.loadNotification();
  }

  modifyNotification(item: any) {
    const modal = this.modalService.open(ModalAddNotificationComponent, {
      backdrop: true,
      centered: true,
      size: 'md'
    })

    modal.componentInstance.notification = item;
    modal.componentInstance.edit = true;

    modal.result.then((result: any) => {
      const response: any = result;
      this.notificationsService.updateNotification(response.id, response).subscribe({
        next: (data: any) => {
          const currentIndex = this.notifications?.findIndex((item: any) => item.idLocal === response.idLocal);
          if(currentIndex > -1) {
            this.notifications[currentIndex].message = response?.message;
            this.utilsService.showSuccess('The notification has been updated successfully with ID ' +data.id + '.');
          }
        },
        error: (err: any) => {
          this.utilsService.showDanger(err?.error?.detail);
        }
      })
    }, () => {})
  }

  closeNotification(item: any) {
    this.utilsService.openModalConfirm('Are you sure you want to close this notification?').then((result) => {
      if(result){
        const params = {
          status: 'closed'
        }
        this.notificationsService.closeNotification(item.id, params).subscribe({
          next: () => {
            const currentIndex = this.notifications?.findIndex((el: any) => el.idLocal === item.idLocal);
            if(currentIndex > -1){
              this.notifications[currentIndex].status = 'closed';
              this.loadNotification();
              this.utilsService.showSuccess('The notification has been closed successfully with ID ' +item.id + '.');
            }
          },
          error: (err: any) => {
            this.utilsService.showDanger(err?.error?.detail);
          }
        })
      }
    })
  }
}
