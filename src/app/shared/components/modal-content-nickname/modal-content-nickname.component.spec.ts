import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentNicknameComponent } from './modal-content-nickname.component';

describe('ModalContentNicknameComponent', () => {
  let component: ModalContentNicknameComponent;
  let fixture: ComponentFixture<ModalContentNicknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContentNicknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
