import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from '../../shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../core/services/loader.service';
import { ChatService } from './chat.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() channelSelected: any;
  @Input() communities: any;
  @Output() sendUserList = new EventEmitter();

  usersList: any = [];
  user: any;
  disable: boolean;
  userBlocked: any;
  isChanged = false;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService
  ) { }

  ngAfterViewInit(): void {
    this.onUpdateUserList();
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.getCurrentUser();

    if (changes.channelSelected.firstChange) {
      this.channelSelected = changes.channelSelected.currentValue;
    } else {
      this.setStorageAndReloadPage();
    }
  }

  ngOnInit() {
    this.getCurrentUser();
    this.onConnect();
  }

  onConnect() {
    this.chatService.on('connect');
    this.chatService.emit('join', this.chatServiceObject());
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

  getCurrentUser() {
    this.user = this.storageService.getStorage('currentUser').user || {};
  }

  setStorageAndReloadPage() {
    this.storageService.setStorage('channelSelected', this.channelSelected);
    this.chatService.emit('leaveRoom', null);
    window.location.reload();
  }

  chatServiceObject() {
    return {
      user: this.user,
      room: this.channelSelected
    }
  }

  onUpdateUserList() {
    this.chatService.on('updateUserList').subscribe(users => {
      this.usersList = users;
      this.sendUserList.emit(this.usersList);
    })
  }

}
