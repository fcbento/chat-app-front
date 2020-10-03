import { Component, HostListener, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {

  message: any;
  activeModal: any;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {

  }

  onSendMessage() {
    this.chatService.emit('createMessage', { text: this.message })
    this.message = ''
  }

  triggerFunction(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      let text = document.getElementById("txtarea");
      text['value'] += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  getLink(e) {
    this.chatService.emit('createMessage', { text: e })
    this.activeModal.close()
  }

  modalRef(e) {
    this.activeModal = e;
  }

}
