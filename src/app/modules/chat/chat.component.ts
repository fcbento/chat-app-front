import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from '../../shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../core/services/loader.service';
import { ChatService } from './chat.service';
import scroll from './scroll';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  user: any
  @Input() room: any
  message: string
  moment = moment
  users = []
  disable: boolean = true;

  @ViewChild('template')
  private template: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef })
  private vc: ViewContainerRef;

  constructor(
    private notification: NotificationService,
    private loaderService: LoaderService,
    private chatService: ChatService) {
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.user = this.user.user
    this.onConnect()
  }

  ngAfterViewInit() {
    this.onNewMessage()
    this.onUpdateUserList()
  }

  onConnect() {

    const params = {
      user: this.user,
      room: this.room.name
    }

    this.chatService.on('connect');
    this.chatService.emit('join', params);
  }

  onNewMessage() {
    this.chatService.on('newMessage').subscribe(message => {
      this.createMessageTemplate(message)
    });

  }

  createMessageTemplate(message) {

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


  handleNotification(message) {

    let user = message.text.split(' ')[0]
    let hasJoined = message.text.includes('has joined')
    let hasLeft = message.text.includes('has left')

    if (hasJoined && this.user.name !== user) {
      this.notification.userOn(user)
      this.notification.audio('juntos', this.disable)
    }

    if (hasLeft && this.user.name !== user) {
      this.notification.userOff(user)
      this.notification.audio('ended', this.disable)
    }

    if (this.user.name !== message.from.user && !hasLeft) {
      this.notification.audio('intuition', this.disable)
    }

  }

  disableSounds() {
    this.disable = !this.disable;
  }

  onUpdateUserList() {
    this.chatService.on('updateUserList').subscribe(users => {
      this.users = users
    })
  }

  onSendMessage() {
    this.chatService.emit('createMessage', { text: this.message })
    this.message = ''
  }

  onLeaveRoom() {
    this.chatService.emit('leaveRoom', null)
    this.checkConnection()
  }

  checkConnection() {
    this.loaderService.show()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  logout() { }

  ngOnDestroy() {
    this.onLeaveRoom()
  }

}
