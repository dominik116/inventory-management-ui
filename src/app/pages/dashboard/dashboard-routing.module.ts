import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './page/employee/employee.component';
import { HomeComponent } from './page/home/home.component';
import { ArticleComponent } from './page/article/article.component';
import { ProfileComponent } from './page/profile/profile.component';
import { NotificationsComponent } from './page/notifications/notifications.component';
import { HasRolesGuard } from 'src/app/core/guards/has-roles.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'articles',
        canLoad: [HasRolesGuard],
        canActivate: [HasRolesGuard],
        data: {
          allowedRoles: ['user']
        },
        component: ArticleComponent
      },
      {
        path: 'employees',
        canLoad: [HasRolesGuard],
        canActivate: [HasRolesGuard],
        data: {
          allowedRoles: []
        },
        component: EmployeeComponent
      },
      {
        path: 'profile/:id',
        canLoad: [HasRolesGuard],
        canActivate: [HasRolesGuard],
        data: {
          allowedRoles: ['user']
        },
        component: ProfileComponent
      },
      {
        path: 'notifications/:id',
        canLoad: [HasRolesGuard],
        canActivate: [HasRolesGuard],
        data: {
          allowedRoles: ['user']
        },
        component: NotificationsComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
