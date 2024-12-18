import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {

  form!: FormGroup;
  submit: boolean = false;
  employee: any;
  showPass: boolean = false;

  constructor(private readonly route: ActivatedRoute,
    private readonly employeeService: EmployeeService,
    private readonly utilsService: UtilsService
  ) {
    this.route.params.subscribe((data: any)=> {
      const username = data.id;
      this.employeeService.getEmployee(username).subscribe({
        next:(data: any)=>{
          this.employee = data;
          this.form = this.buildForm();
        },
        error:(err: any) =>{
          this.utilsService.showDanger(err?.error?.detail);
        }
      })
    })
   }

  buildForm(){
    return new FormGroup({
      username: new FormControl({value: this.employee?.username || null, disabled: true}, Validators.required),
      name: new FormControl(this.employee?.name || null, Validators.required),
      surname: new FormControl(this.employee?.surname || null, Validators.required),
      nif: new FormControl(this.employee?.nif || null, [Validators.required, Validators.maxLength(9)]),
      email: new FormControl(this.employee?.email || null, Validators.required),
      password: new FormControl(null, [Validators.pattern(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/), Validators.required])
    })
  }

  updateEmployee(){
    this.submit = true;
    if(this.form.invalid){
      return;
    }
    const params = { ...this.form.getRawValue() };
    this.utilsService.openModalConfirm('Are you sure you want update this employee?').then((result) => {
      if(result){
        this.employeeService.updateEmployee(this.employee.id, params).subscribe({
          next: () => {
            this.utilsService.showSuccess('Employee updated successfully.');
          },
          error: (err: any) => {
            this.utilsService.showDanger(err?.error?.detail);
          }
        })
      }
    })
  }

  toggleShowPass(){
    this.showPass = !this.showPass;
  }

}
