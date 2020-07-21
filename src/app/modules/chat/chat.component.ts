import { Component, OnInit, AfterViewChecked, ViewChild, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  socket;
  user = {};
  room: any;
  message: string;
  moment = moment;
  users = [];

  @ViewChild('template')
  private template: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef })
  private vc: ViewContainerRef;

  constructor(private router: Router) {
    this.socket = io(environment.SERVER);
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.room = JSON.parse(localStorage.getItem('room'));
    this.onConnect();
  }

  ngAfterViewInit() {
    this.onNewMessage();
    this.onUpdateUserList();
  }

  onConnect() {

    const params = {
      user: this.user['user'],
      room: this.room

    }

    const socket = this.socket;

    this.socket.on('connect', () => {
      socket.emit('join', params, (err) => {
        if (err) {
          alert(err);
          this.router.navigateByUrl('/room');
        }
      });
    });
  }

  onNewMessage() {
    this.socket.on('newMessage', (message) => {
      this.vc.createEmbeddedView(this.template,
        {
          chatMessage:
            { from: message.from, createdAt: message.createdAt, text: message.text }
        });
      //scrollToBottom();
    });
  }

  onUpdateUserList() {
    this.socket.on('updateUserList', (users) => {
      this.users = users;
    });
  }

  onSendMessage() {
    this.socket.emit('createMessage', {
      text: this.message
    }, () => {
      this.message = '';
    })
  }

  onLeaveRoom() {
    this.router.navigateByUrl('/room');
    this.socket.emit('leaveRoom', (err) => {
      if (err) {
        this.router.navigateByUrl('/room');
      }
    });
  }

  logout() { }

  ngOnDestroy() {
    this.onLeaveRoom();
  }

}
