import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ArticleComponent } from './page/article/article.component';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './page/employee/employee.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ArticleComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
