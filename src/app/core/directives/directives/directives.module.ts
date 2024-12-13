import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowForRolesDirective } from '../show-for-roles.directive';
import { DisableForRolesDirective } from '../disable-for-roles.directive';



@NgModule({
  declarations: [ShowForRolesDirective, DisableForRolesDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ShowForRolesDirective,
    DisableForRolesDirective
  ]
})
export class DirectivesModule { }
