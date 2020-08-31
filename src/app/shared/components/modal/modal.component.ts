import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'chat-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalType: any;
  @Input() modalLinkName: any;
  @Input() modalContent: any;
  @Input() modalSize: any;
  @Input() modalIconName: any;

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void { }

  openModal(content) {
    this.modalService.open(content,
      {
        size: this.modalSize,
        centered: true
      }
    )
  }

}
