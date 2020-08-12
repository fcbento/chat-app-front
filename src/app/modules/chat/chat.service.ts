import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  users: any[];

  constructor() {
    this.socket = io(environment.SERVER);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string) {

    return Observable.create(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });
    })
  }
}

