import { PlatformLocation } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-notification',
  templateUrl: './modal-add-notification.component.html',
  styleUrls: ['./modal-add-notification.component.scss']
})
export class ModalAddNotificationComponent implements OnInit {

  @Input() notification: any;
  @Input() edit: boolean = false;
  form!: FormGroup;
  submit: boolean = false;

  constructor(public readonly modal: NgbActiveModal, private readonly location: PlatformLocation) {
      location.onPopState(() => {
        this.modal.dismiss('dismiss');
      });
    }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = new FormGroup({
      subject: new FormControl({value: this.notification?.subject || null, disabled: this.edit}, Validators.required),
      message: new FormControl(this.notification?.message || null, Validators.required)
    });
  }

  addNotification(){
    this.submit = true;
    if(this.form.invalid){
      return;
    }
    const params = { ...this.form.getRawValue() };
    if(this.edit){
      params.id = this.notification.id;
      params.idLocal = this.notification.idLocal;
    }
    this.modal.close(params);
  }

}
