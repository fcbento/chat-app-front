import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit, AfterViewInit {

  @Input() room: any;
  users: any;
  disable: boolean = true;
  @Output() disableSound = new EventEmitter();

  constructor(private chatService: ChatService, private loaderService: LoaderService) { }

  ngOnInit(): void { }

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
      this.users = users
    })
  }

}
