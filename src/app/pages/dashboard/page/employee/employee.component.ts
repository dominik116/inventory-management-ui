import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/core/services/utils.service';
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

  pageNumber: number = 1;
  
  headers: any[] = [];

  constructor(private employeeService: EmployeeService, private readonly modalService: NgbModal,
    private readonly utilsService: UtilsService) {
    this.createTableHeader();
  }

  ngOnInit(): void {
    this.pagination = this.getPagination();
    this.loadData();
  }

  loadData() {
    this.employeeService.getEmployees(this.pagination).subscribe({
      next: (data: any) => {
        this.employees = data?.content || [];
        this.pagination.total = data.total;
        this.mapData();
      },
      error: (err: any) => {
        this.utilsService.showDanger(err?.error?.detail);
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

  pageChange(page: number) {
    this.pagination.page = page - 1;
    this.loadData();
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
          this.utilsService.showDanger(err?.error?.detail);
        }
      })
    }, () => {});
  }

  deleteEmployee(employee: any): void {
    this.utilsService.openModalConfirm('Are you sure you want to delete this employee?').then((result) => {
      if(result){
        this.employeeService.deleteEmployee(employee.id).subscribe({
          next: () => {
            this.loadData();
            this.utilsService.showSuccess('Employee deleted successfully!');
          },
          error: (err: any) => {
            this.utilsService.showDanger(err?.error?.detail);
          }
        });
      }
    })
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
      this.employeeService.updateEmployee(result.id, result).subscribe({
        next: () => {
          const currentIndex = this.employees?.findIndex(item => item.idLocal === result.idLocal)
          if (currentIndex > -1) {
            this.employees[currentIndex] = result;
            this.utilsService.showSuccess('The employee has been updated successfully.');
          }
        },
        error: (err: any) => {
          this.utilsService.showDanger(err?.error?.detail);          
        }
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
        value: 'enabled',
        type: 'BOOLEAN',
        callback: (item: any) => {
          if(item?.enabled){
            return true;
          }
          return false;
        }
      },
      {
        key: 'Actions',
        value: 'options'
      }
    ]
  }
}
