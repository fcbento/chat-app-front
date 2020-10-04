import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageYoutubeComponent } from './chat-message-youtube.component';

describe('ChatMessageYoutubeComponent', () => {
  let component: ChatMessageYoutubeComponent;
  let fixture: ComponentFixture<ChatMessageYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
