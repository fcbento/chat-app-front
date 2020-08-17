import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { NotificationService } from '../../../shared/services/notification.service';
import scroll from '../scroll';
import * as moment from '../../../../../node_modules/moment';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, AfterViewInit {

  message: any
  user: any
  moment = moment

  @ViewChild('template')
  private template: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef })
  private vc: ViewContainerRef;

  constructor(private chatService: ChatService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.user = this.user.user
  }

  ngAfterViewInit() {
    this.onNewMessage()
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
      scroll();
    }

  }

  handleNotification(message) {

    let user = message.text.split(' ')[0]
    let hasJoined = message.text.includes('has joined')
    let hasLeft = message.text.includes('has left')

    if (hasJoined && this.user.name !== user) {
      this.notification.userOn(user)
      this.notification.audio('juntos', true)
    }

    if (hasLeft && this.user.name !== user) {
      this.notification.userOff(user)
      this.notification.audio('ended', true)
    }

    if (this.user.name !== message.from.user && !hasLeft) {
      this.notification.audio('intuition', true)
    }

  }

}
