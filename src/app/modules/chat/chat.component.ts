import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from '../../shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../core/services/loader.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() room: any
  user: any
  disable: boolean;
  userBlocked: any;

  constructor(
    private notification: NotificationService,
    private loaderService: LoaderService,
    private chatService: ChatService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || {}
    this.user = this.user.user || {}
    this.onConnect()
  }

  onConnect() {
    this.chatService.on('connect');
    this.chatService.emit('join', { user: this.user, room: this.room.name });
  }

  disableSounds(e) {
    this.disable = e;
  }

  ngOnDestroy() {
    this.chatService.emit('leaveRoom', null)
  }

  blockUser(e) {
    this.userBlocked = e;
  }

}
