import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';
import { ModalAddEmployeeComponent } from 'src/app/shared/modal-add-employee/modal-add-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];

  pagination: any;

  SIZE_PAGE = 5;
  
  headers: any[] = [];

  constructor(private employeeService: EmployeeService, private readonly modalService: NgbModal) {
    this.createTableHeader();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.pagination = this.getPagination();
    this.employeeService.getEmployees(this.pagination).subscribe({
      next: (data: any) => {
        this.employees = data?.content || [];
        this.pagination.total = data.total;
        this.mapData();
       }
    })
  }

  mapData() {
    if (this.employees?.length > 0) {
      this.employees.forEach((employee: any, index: number) => {
        employee.idLocal = index + 1;
      })
    }
  }

  getPagination() {
    return {
      page: 0,
      size: this.SIZE_PAGE
    }
  }

  addEmployee(): void {
    const modal = this.modalService.open(ModalAddEmployeeComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.result.then((result: any) => {
      this.employeeService.addEmployee(result).subscribe({
        next: (data: any) => {
          this.loadData();
        },
        error: (err: any) => {
          this.loadData();
          alert(err.error.detail);
        }
      })
    }, () => {});
  }

  deleteEmployee(employee: any): void {
    const confirmation = confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
      this.employeeService.deleteEmployee(employee.id).subscribe(() => {
        this.loadData();
        alert('Employee deleted successfully!');
      });
    }
  }

  modifyEmployee(employee: any) {
    const modal = this.modalService.open(ModalAddEmployeeComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.componentInstance.employee = employee;
    modal.componentInstance.edit = true;
    modal.result.then((result: any) => {
      this.employeeService.updateEmployee(result.id, result).subscribe(() => {
        this.loadData();
      })
    }, () => {});
  }

  createTableHeader() {
    this.headers = [
      {
        key: 'Username',
        value: 'username'
      },
      {
        key: 'Name',
        value: 'name'
      },
      {
        key: 'Surname',
        value: 'surname'
      },
      {
        key: 'NIF',
        value: 'nif'
      },
      {
        key: 'Email',
        value: 'email'
      },
      {
        key: 'Enabled',
        value: 'enabled'
      },
      {
        key: 'Actions',
        value: 'options'
      }
    ]
  }
}
