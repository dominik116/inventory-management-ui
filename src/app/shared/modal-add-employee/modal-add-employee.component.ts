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

  constructor(public readonly modal: NgbActiveModal) {

   }

  ngOnInit(): void {
    this.buildForm();
  }

  addEmployee() {
    this.submit = true;
    if (this.form.invalid) return ;
    const params = {...this.form.getRawValue()};
    this.modal.close(params);
  }
  
  buildForm() {
    this.form = new FormGroup({
      id: new FormControl({value: this.employee?.id || null, disabled:this.edit}, Validators.required),
      username: new FormControl(this.employee?.username || null, Validators.required),
      name: new FormControl(this.employee?.name || null, Validators.required),
      surname: new FormControl(this.employee?.surname || null, Validators.required),
      nif: new FormControl(this.employee?.nif || null, Validators.required),
      email: new FormControl(this.employee?.email || null, Validators.required),
      enabled: new FormControl(this.employee?.enabled || false),
      password: new FormControl(this.employee?.password || null, Validators.pattern("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"))
    });
  }
}
