import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: any[] = [
    { id: '1', username: 'dominik.novotny', name: 'Dominik', surname: 'Novotny', nif: 'Y2039429Q', email: 'dominik116@hotmail.es', enabled: true, password: 'Contraseña_33'},
    { id: '2', username: 'test.test', name: 'Test', surname: 'Test', nif: 'Y0011100Q', email: 'test@test.com', enabled: false, password: 'Contraseña_33'}
  ];

  constructor() {
  }

  getEmployees(): any[] {
    return this.employees;
  }

  addEmployee(employee: any): void {
    this.employees.push(employee);
  }

  updateEmployee(employeeId: string, updatedEmployee: any): void {
    const index = this.employees.findIndex(employee => employee?.id === employeeId);
    if (index) this.employees[index] = updatedEmployee;
  }

  deleteEmployee(employeeId: string): void {
    this.employees = this.employees.filter(employee => employee.id !== employeeId);
  }
}
