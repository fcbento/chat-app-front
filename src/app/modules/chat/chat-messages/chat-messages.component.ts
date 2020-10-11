import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { NotificationService } from '../../../shared/services/notification.service';
import * as moment from '../../../../../node_modules/moment';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment'
@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, AfterViewInit, AfterViewChecked {

  message: any
  user: any
  moment = moment
  isYoutube: boolean = false;
  isUser;

  @ViewChild('template')
  private template: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef })
  private vc: ViewContainerRef;

  @ViewChild('scrollMe')
  private scrollMe: ElementRef;

  @Input() disableSounds: boolean;
  @Input() userBlocked: any = [];

  constructor(
    private chatService: ChatService,
    private notification: NotificationService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.user = this.user.user
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

  isCurrentUser(message) {
    return message.from === this.user.name
  }

  createMessageTemplate(message) {
    this.isCurrentUser(message)
    if (message.text.includes('has joined') || message.text.includes('has left')) {
      this.handleNotification(message);
    } else {
      this.handleNotification(message);

      if (this.userBlocked && this.userBlocked.length > 0) {

        if (!this.userBlocked.filter(blocked => blocked === message.from.user)[0]) {
          this.vc.createEmbeddedView(this.template, { message: this.messageObj(message) });
        }
      } else {
        this.vc.createEmbeddedView(this.template, { message: this.messageObj(message) });
        this.scrollToBottom();
      }
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
      this.notification.audio('juntos', this.disable())
    }

    if (hasLeft && this.user.name !== user) {
      this.notification.userOff(user)
      this.notification.audio('ended', this.disable())
    }

    if (this.user.name !== message.from.user && !hasLeft) {
      this.notification.audio('intuition', this.disable())
    }

  }

  disable(): boolean {
    return this.disableSounds !== undefined ? this.disableSounds : true
  }

  messageObj(message) {
    return {
      from: message.from.user,
      createdAt: message.createdAt,
      text: message.text,
      isYoutube: message.isYoutube,
      isAudio: message.isAudio
    }
  }

  sanitize(url: string) {

    let server = '';
    
    if(server === 'https://chat-back.azurewebsites.net/home/site/wwwroot') {
      server = 'https://chat-back.azurewebsites.net'
    }

    if(server === 'https://chat-back.azurewebsites.net/home/site/wwwroot') {
      server = 'https://chat-back.azurewebsites.net'
    }

    console.log(server)
    return this.domSanitizer.bypassSecurityTrustUrl(server + url);
  }

}
