import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNotificationComponent } from './modal-add-notification.component';

describe('ModalAddNotificationComponent', () => {
  let component: ModalAddNotificationComponent;
  let fixture: ComponentFixture<ModalAddNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
