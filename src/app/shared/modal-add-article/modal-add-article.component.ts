import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public readonly modal: NgbActiveModal) {

   }

  ngOnInit(): void {
    this.buildForm();
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
      name: new FormControl(this.article?.name || null, Validators.required),
      description: new FormControl(this.article?.description || null),
      quantity: new FormControl(this.article?.quantity || 0, Validators.pattern('^[0-9]*$')),
      price: new FormControl(this.article?.price || 0)
    });
  }
}
