import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  
  constructor(public override readonly http: HttpClient) {
    super(http);
  }

  addEmployee(employee: any) {
    return this.post('/auth/signup', employee);
  }

  getEmployees(pagination: any) {
    return this.getPaginated('/employees', pagination);
  }

  getEmployee(username: any) {
    return this.get(`/employees/${username}`);
  }

  updateEmployee(id: any, updatedEmployee: any) {
    return this.put(`/employees/${id}`, updatedEmployee);
  }

  deleteEmployee(id: string) {
    return this.delete(`/employees/${id}`);
  }
}