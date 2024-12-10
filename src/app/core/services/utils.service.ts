import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  toasts: any[] = [];

  constructor(private readonly modalService: NgbModal) { }

  openModalConfirm(message: string = 'Are you sure you want to delete this register?') {
    const modal = this.modalService.open(ModalConfirmComponent, {
      centered: true,
      backdrop: true
    });
    modal.componentInstance.msg = message;

    return modal.result.then((result: any) => Promise.resolve(result), (reason: any) => { });
  }

  showSuccess(msg: string){
    this.show(msg, { classname: 'bg-primary text-light', delay: 10000 });
  }

  showDanger(msg: string){
    this.show(msg, { classname: 'bg-danger text-light', delay: 5000 });
  }

  show(text: string, options: any){
    this.toasts.push({ text, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
