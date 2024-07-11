import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEmployeeComponent } from './modal-add-employee.component';

describe('ModalAddEmployeeComponent', () => {
  let component: ModalAddEmployeeComponent;
  let fixture: ComponentFixture<ModalAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
