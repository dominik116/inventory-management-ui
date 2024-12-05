import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  @Input() headers!: any[];

  @Input() data!: any[];

  @Input() pagination: any;

  @Input() pageSize = 15;

  @Output() paginationChange = new EventEmitter();

  page = 1;

  widthHead: any;

  constructor() { }

  ngOnInit(): void {
    if (this.headers?.length) {
      this.calculateColumnWidth();
    }
  }

  changePagination(index: number) {
    this.page = index;
    this.paginationChange.emit(this.page);
  }

  calculateColumnWidth() {
    this.widthHead = (90 / this.headers.length) + '%';
  }

}
