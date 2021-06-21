import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit, AfterViewInit {

  @Output() disableSound = new EventEmitter();
  @Output() blockedUser = new EventEmitter();
  @Input() room: any;

  users: any = [];
  currentUser: any;
  disable: boolean = true;
  userBlocked: any;
  isBlocked: boolean = false;
  display: number;
  blockedUsers: any = []

  constructor(
    private chatService: ChatService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngAfterViewInit() {
    this.onUpdateUserList()
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

  disableSounds() {
    this.disable = !this.disable;
    this.disableSound.emit(this.disable)
  }

  onUpdateUserList() {
    this.chatService.on('updateUserList').subscribe(users => {
      this.users = users;
    })
  }

  blockUser(user) {
    this.blockedUsers.push(user);
    this.users = this.users.filter(item => item !== user)
    this.userBlocked = user;
    this.blockedUser.emit(this.blockedUsers);
  }

  unblockUser(user) {
    this.blockedUsers = this.blockedUsers.filter(item => item !== user)
    this.users.push(user);
    this.userBlocked = null;
    this.blockedUser.emit(this.blockedUsers);
  }

}
