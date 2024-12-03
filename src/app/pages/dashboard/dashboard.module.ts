import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ArticleComponent } from './page/article/article.component';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './page/employee/employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ArticleComponent,
    EmployeeComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    NgbModule,
    NgbDropdownModule
  ]
})
export class DashboardModule { }
