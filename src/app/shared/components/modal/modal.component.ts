import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'chat-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalType: any;
  @Input() modalLinkName: any;

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  openModal() {
    this.modalService.open('', {size: 'sm', centered: true})
  }

}
