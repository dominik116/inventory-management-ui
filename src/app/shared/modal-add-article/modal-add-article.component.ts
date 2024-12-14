import { PlatformLocation } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-add-article',
  templateUrl: './modal-add-article.component.html',
  styleUrls: ['./modal-add-article.component.scss']
})
export class ModalAddArticleComponent implements OnInit {

  @Input() article: any;

  @Input() edit: boolean = false;

  form!: FormGroup;

  submit: any;

  admin: boolean = false;

  maxQuantity: string = '';

  constructor(public readonly modal: NgbActiveModal, private readonly authService: AuthService, private readonly location: PlatformLocation) {
    location.onPopState(() => {
      this.modal.dismiss('dismiss');
    });
  }

  ngOnInit(): void {
    this.authService.getRoles().subscribe((user) => {
      if(user==='admin') {
        this.admin = true;
      }
      this.buildForm();
    })
  }

  addArticle() {
    this.submit = true;
    if (this.form.invalid) return ;
    const params = {...this.form.getRawValue()};
    if (this.article?.id) {
      params.id = this.article.id;
      params.idLocal = this.article.idLocal;
    }
    this.modal.close(params);
  }

  
  buildForm() {
    this.form = new FormGroup({
      EAN: new FormControl({value: this.article?.EAN || null, disabled:this.edit}, Validators.required),
      name: new FormControl({value: this.article?.name || null, disabled:!this.admin}, Validators.required),
      description: new FormControl({value: this.article?.description || null, disabled:!this.admin}),
      quantity: new FormControl(this.article?.quantity || 0, Validators.pattern(/^[0-9]*$/)),
      price: new FormControl({value: this.article?.price || 0, disabled:!this.admin})
    });
    if(!this.admin) {
      this.maxQuantity = this.article.quantity.toString();
    }
  }
}
