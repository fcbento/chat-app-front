import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { NotificationService } from '../../../shared/services/notification.service';
import * as moment from '../../../../../node_modules/moment';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, AfterViewInit, AfterViewChecked {

  message: any
  user: any
  moment = moment

  @ViewChild('template')
  private template: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef })
  private vc: ViewContainerRef;

  @ViewChild('scrollMe')
  private scrollMe: ElementRef;

  @Input() disableSounds: boolean;
 
  constructor(private chatService: ChatService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.user = this.user.user
    this.scrollToBottom();
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.onNewMessage()
    this.scrollToBottom();
  }

  onNewMessage() {
    this.chatService.on('newMessage').subscribe(message => {
      this.createMessageTemplate(message)
    });

  }

  createMessageTemplate(message) {
    if (message.text.includes('has joined') || message.text.includes('has left')) {
      this.handleNotification(message);
    } else {
      this.handleNotification(message);
      this.vc.createEmbeddedView(this.template,
        {
          chatMessage: {
            from: message.from.user,
            createdAt: message.createdAt,
            text: message.text
          }
        });

      this.scrollToBottom();
    }

  }

  scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (err) { }
  }

  handleNotification(message) {

    let user = message.text.split(' ')[0]
    let hasJoined = message.text.includes('has joined')
    let hasLeft = message.text.includes('has left')

    if (hasJoined && this.user.name !== user) {
      this.notification.userOn(user)
      this.notification.audio('juntos', this.disableSounds !== undefined ? this.disableSounds : true) 
    }

    if (hasLeft && this.user.name !== user) {
      this.notification.userOff(user)
      this.notification.audio('ended', this.disableSounds !== undefined ? this.disableSounds : true)
    }

    if (this.user.name !== message.from.user && !hasLeft) {
      this.notification.audio('intuition', this.disableSounds !== undefined ? this.disableSounds : true)
    }

  }

}
