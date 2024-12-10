import { Component, TemplateRef } from '@angular/core';
import { UtilsService } from './core/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public readonly utilsService: UtilsService){}
  title = 'inventory-management';

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
