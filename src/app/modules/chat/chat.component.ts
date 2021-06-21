import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy, OnChanges {

  @Input() channelSelected: any;
  @Input() communities: any;

  users: any = [];

  user: any
  disable: boolean;
  userBlocked: any;
  isChanged = false;
  j: number;

  constructor(
    private chatService: ChatService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || {}
    this.user = this.user.user || {}
    if (changes.channelSelected.firstChange) {
      this.channelSelected = changes.channelSelected.currentValue;
    } else {
      localStorage.setItem('channelSelected',  JSON.stringify(this.channelSelected));
      this.chatService.emit('leaveRoom', null);
      window.location.reload();
    }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || {}
    this.user = this.user.user || {}
    this.onConnect();
  }
  onConnect() {
    this.chatService.on('connect');
    this.chatService.emit('join', { user: this.user, room: this.channelSelected });
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
