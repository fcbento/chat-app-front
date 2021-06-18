import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesChatComponent } from './communities-chat.component';

describe('CommunitiesChatComponent', () => {
  let component: CommunitiesChatComponent;
  let fixture: ComponentFixture<CommunitiesChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
