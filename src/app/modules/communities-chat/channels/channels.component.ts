import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, AfterViewInit {

  @Input() channels: any;
  @Output() sendCurrentChannel = new EventEmitter;

  activeModal: any;

  constructor(private cdr: ChangeDetectorRef, public auth: AuthenticationService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      if (localStorage.getItem('channelSelected')) {
        this.getCurrentChannel({ name: JSON.parse(localStorage.getItem('channelSelected')) });
      } else {
        this.getCurrentChannel(this.channels.channels[0])
        this.cdr.detectChanges();
      }

    }, 1000)
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.checkCommunityOwner();
  }

  modalRef(e) {
    this.activeModal = e;
  }

  getCurrentChannel(cuurentChannel) {
    this.sendCurrentChannel.emit(cuurentChannel);
  }

  getCurrentUser(){
   return this.auth.currentUserValue['user'].name;
  }

  checkCommunityOwner() {
    
    let isSame = false;

    if(this.getCurrentUser() === this.channels.owner.name) {
      isSame = true;
    }

    return isSame;
  }

}
