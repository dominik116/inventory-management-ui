import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddArticleComponent } from './modal-add-article.component';

describe('ModalAddArticleComponent', () => {
  let component: ModalAddArticleComponent;
  let fixture: ComponentFixture<ModalAddArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
