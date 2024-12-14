import { PlatformLocation } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  @Input() msg!: string;

  constructor(public readonly modal: NgbActiveModal, private readonly location: PlatformLocation) {
      location.onPopState(() => {
        this.modal.dismiss('dismiss');
      }); 
    }

  ngOnInit(): void {
  }

}
