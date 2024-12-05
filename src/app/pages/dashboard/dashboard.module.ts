import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ArticleComponent } from './page/article/article.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { HomeComponent } from './page/home/home.component';
import { NotificationsComponent } from './page/notifications/notifications.component';
import { ProfileComponent } from './page/profile/profile.component';

@NgModule({
  declarations: [
    ArticleComponent,
    EmployeeComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgbDropdownModule
  ]
})
export class DashboardModule { }
