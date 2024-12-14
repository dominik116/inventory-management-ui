import { PlatformLocation } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-employee',
  templateUrl: './modal-add-employee.component.html',
  styleUrls: ['./modal-add-employee.component.scss']
})
export class ModalAddEmployeeComponent implements OnInit {

  @Input() employee: any;

  @Input() edit: boolean = false;

  form!: FormGroup;

  submit: any;
  showPass: boolean = false;

  constructor(public readonly modal: NgbActiveModal, private readonly location: PlatformLocation) {
    location.onPopState(() => {
      this.modal.dismiss('dismiss');
    });
   }

  ngOnInit(): void {
    this.buildForm();
  }

  addEmployee() {
    this.submit = true;
    if (this.form.invalid) return ;
    const params = {...this.form.getRawValue()};
    if (this.edit) {
      params.id = this.employee.id;
      params.idLocal = this.employee.idLocal;
    }
    this.modal.close(params);
  }
  
  buildForm() {
    this.form = new FormGroup({
      username: new FormControl(this.employee?.username || null, Validators.required),
      name: new FormControl(this.employee?.name || null, Validators.required),
      surname: new FormControl(this.employee?.surname || null, Validators.required),
      nif: new FormControl(this.employee?.nif || null, [Validators.required, Validators.maxLength(9)]),
      email: new FormControl(this.employee?.email || null, Validators.required),
      enabled: new FormControl(this.employee?.enabled || false),
      password: new FormControl(null, [Validators.pattern(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/), Validators.required])
    });
    if(this.edit){
      this.form.get('password')?.removeValidators([Validators.pattern(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/), Validators.required]);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  toggleShowPass(){
    this.showPass = !this.showPass;
  }
}
