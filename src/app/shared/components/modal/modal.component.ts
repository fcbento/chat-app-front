import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'chat-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbActiveModal]
})
export class ModalComponent implements OnInit {

  @Input() modalType: any;
  @Input() modalLinkName: any;
  @Input() modalContent: any;
  @Input() modalSize: any;
  @Input() modalIconName: any;
  @Output() modalRef = new EventEmitter();

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void { }

  openModal(content) {
    this.modalRef.emit(this.modalService.open(content,
      {
        size: this.modalSize,
        centered: true
      }
    ))
  }

}
