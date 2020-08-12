import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../shared/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  socket;
  user: any;
  @Input() room: any;
  message: string;
  moment = moment;
  users = [];

  @ViewChild('template')
  private template: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef })
  private vc: ViewContainerRef;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private loaderService: LoaderService) {
    this.socket = io(environment.SERVER);
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user = this.user.user;
    this.onConnect()
  }

  ngAfterViewInit() {
    this.onNewMessage();
    this.onUpdateUserList();
  }

  onConnect() {

    const params = {
      user: this.user,
      room: this.room.name
    }

    const socket = this.socket;

    this.socket.on('connect', () => {

      socket.emit('join', params, (err) => {
        if (err) {
          this.notificationService.error(err);
          this.router.navigateByUrl('/room');
          this.modalService.dismissAll()
        }
      });
    });
  }

  onNewMessage() {
    this.socket.on('newMessage', (message) => {

      if (message.text.includes('has joined') && this.user.name !== message.text.split(' ')[0]) {
        this.notificationService.userOn((message.text.split(' ')[0]))
      } else {
        this.vc.createEmbeddedView(this.template,
          {
            chatMessage: {
              from: message.from.user,
              createdAt: message.createdAt,
              text: message.text
            }

          });
        //scrollToBottom();
      }
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
    this.socket.emit('leaveRoom', (err) => {
      if (err) {
        this.modalService.dismissAll();
        this.router.navigateByUrl('/room');
        this.checkConnection()
      }
    });
  }

  checkConnection() {
    this.loaderService.show()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  logout() { }

  ngOnDestroy() {
    this.onLeaveRoom();
  }

}
