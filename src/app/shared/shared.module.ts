import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddArticleComponent } from './modal-add-article/modal-add-article.component';
import { ModalAddEmployeeComponent } from './modal-add-employee/modal-add-employee.component';
import { TableComponent } from './table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalAddArticleComponent,
    ModalAddEmployeeComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalAddArticleComponent,
    ModalAddEmployeeComponent,
    TableComponent
  ]
})
export class SharedModule { }
