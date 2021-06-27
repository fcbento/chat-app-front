import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, AfterViewInit {

  @Input() channels: any;
  @Output() sendCurrentChannel = new EventEmitter;

  activeModal: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public auth: AuthenticationService,
    public storageService: StorageService
  ) { }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.storageService.getStorage('channelSelected')) {
        this.getCurrentChannel({ name: this.storageService.getStorage('channelSelected') });
      } else {
        this.getCurrentChannel(this.channels.channels[0])
        this.cdr.detectChanges();
      }

    }, 1000);

  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.checkCommunityOwner();
    this.checkStatusMember();
  }

  modalRef(e) {
    this.activeModal = e;
  }

  getCurrentChannel(currentChannel) {
    this.sendCurrentChannel.emit(currentChannel);
  }

  getCurrentUser() {
    return this.auth.currentUserValue['user'];
  }

  checkCommunityOwner() {

    let isSame = false;

    if (this.getCurrentUser() === this.channels.owner.name) {
      isSame = true;
    }

    return isSame;
  }

  checkStatusMember() {
    const user = this.channels.members.filter(item => item.user && item.user.name === this.getCurrentUser());
  }

}
