import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content-nickname',
  templateUrl: './modal-content-nickname.component.html',
  styleUrls: ['./modal-content-nickname.component.scss']
})
export class ModalContentNicknameComponent implements OnInit {

  @Input() room: any
  nickname: string

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {}

  goChat() {
    localStorage.setItem('room', JSON.stringify(this.room.name))
    // localStorage.setItem('nickname', JSON.stringify(this.nickname))
    this.modalService.dismissAll()
    this.router.navigateByUrl('/chat')
  }

  getFormValues(value) {
    if (value.type === 'nickname') {
      this.nickname = value.content
    }
  }

}
