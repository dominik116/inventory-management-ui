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

  constructor(private employeeService: EmployeeService, private readonly modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.employees = this.employeeService.getEmployees();
  }

  addEmployee(): void {
    const modal = this.modalService.open(ModalAddEmployeeComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.result.then((result: any) => {
      this.employeeService.addEmployee(result);
      this.loadData();
    }, () => {});
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId);
    this.loadData();
  }

  modifyEmployee(employee: any) {
    const modal = this.modalService.open(ModalAddEmployeeComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.componentInstance.article = employee;
    modal.componentInstance.edit = true;
    modal.result.then((result: any) => {
      this.employeeService.updateEmployee(result.id, result);
      this.loadData();
    }, () => {});
  }

}
